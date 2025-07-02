import fs from "fs/promises";
import { PrismaClient } from "../../../generated/prisma/index.js";
import { fetchExitLoad, fetchFundData } from "../utils/helper.js";

const prisma = new PrismaClient();

export const enrichAndInsert = async (funds) => {
  const failedFunds = [];

  for (const fund of funds) {
    const isin = fund.isinGrowth;

    try {
      const kuvera = await fetchFundData(isin);

      if (!kuvera || !kuvera.code) throw new Error("Missing Kuvera fund code");

      const exit_load = await fetchExitLoad(kuvera.code);

      await prisma.mutual_fund.create({
        data: {
          scheme_code: fund.schemeCode,
          code: kuvera.code,
          name: kuvera.name,
          exit_load: exit_load,
          short_name: kuvera.short_name + "Fund",
          lump_available: kuvera.lump_available,
          sip_available: kuvera.sip_available,
          lump_min: kuvera.lump_min,
          lump_min_additional: kuvera.lump_min_additional,
          lump_max: BigInt(kuvera.lump_max),
          lump_multiplier: kuvera.lump_multiplier,
          sip_min: kuvera.sip_min,
          sip_max: BigInt(kuvera.sip_max),
          sip_multiplier: kuvera.sip_multiplier,
          redemption_allowed: kuvera.redemption_allowed,
          redemption_amount_multiple: kuvera.redemption_amount_multiple,
          redemption_amount_minimum: kuvera.redemption_amount_minimum,
          redemption_quantity_multiple: kuvera.redemption_quantity_multiple,
          redemption_quantity_minimum: kuvera.redemption_quantity_minimum,
          category: kuvera.category,
          lock_in_period: kuvera.lock_in_period,
          sip_maximum_gap: kuvera.sip_maximum_gap,
          fund_house: kuvera.fund_house,
          fund_name: kuvera.fund_name,
          short_code: kuvera.short_code,
          detail_info: kuvera.detail_info,
          ISIN: kuvera.ISIN,
          direct: kuvera.direct,
          switch_allowed: kuvera.switch_allowed,
          stp_flag: kuvera.stp_flag,
          swp_flag: kuvera.swp_flag,
          instant: kuvera.instant,
          reinvestment: kuvera.reinvestment,
          slug: kuvera.slug,
          channel_partner_code: kuvera.channel_partner_code,
          tax_period: kuvera.tax_period,
          insta_redeem_min_amount: kuvera.insta_redeem_min_amount,
          insta_redeem_max_amount: kuvera.insta_redeem_max_amount,
          small_screen_name: kuvera.small_screen_name,
          start_date: kuvera.start_date,
          face_value: kuvera.face_value,
          fund_type: kuvera.fund_type,
          fund_category: kuvera.fund_category,
          plan: kuvera.plan,
          expense_ratio: kuvera.expense_ratio,
          expense_ratio_date: kuvera.expense_ratio_date,
          fund_manager: kuvera.fund_manager,
          crisil_rating: kuvera.crisil_rating,
          investment_objective: kuvera.investment_objective,
          portfolio_turnover: kuvera.portfolio_turnover,
          maturity_type: kuvera.maturity_type,
          aum: kuvera.aum,
          fund_rating: kuvera.fund_rating,
          fund_rating_date: kuvera.fund_rating_date,
        },
      });
    } catch (error) {
      console.log(`❌ Failed: ${isin} | ${error.message}`);

      failedFunds.push({
        scheme_code: fund.schemeCode,
        scheme_name: fund.schemeName,
        isin: isin,
        reason: error.message,
        timestamp: new Date().toISOString(), // Add timestamp for debugging
      });
    }
  }

  // Write failed funds file
  await fs.mkdir("src/scripts/logs", { recursive: true });
  await fs.writeFile(
    "src/scripts/logs/unmatched-funds.json",
    JSON.stringify(failedFunds, null, 2)
  );

  console.log(
    `📝 Summary - Inserted: ${funds.length - failedFunds.length}, Failed: ${
      failedFunds.length
    }`
  );
};
