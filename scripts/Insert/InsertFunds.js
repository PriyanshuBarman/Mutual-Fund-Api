import fs from "fs/promises";
import pLimit from "p-limit";
import { PrismaClient } from "../../generated/prisma/index.js";
import { getFilteredDirectFunds } from "./utils/getFilteredDirectFunds.js";
import { fetchFundData } from "./utils/fetchFundData.js";
import { fetchExitLoad } from "./utils/fetchExitLoad.js";

const db = new PrismaClient();

export const enrichAndInsert = async () => {
  const filteredFunds = await getFilteredDirectFunds();

  const existingFunds = await db.mutual_fund.findMany({
    select: { scheme_code: true, code: true },
  });

  // Build a Set for fast lookup
  const existingSchemeCodes = new Set(existingFunds.map((f) => f.scheme_code));
  const existingCodes = new Set(existingFunds.map((f) => f.code));

  const limit = pLimit(100);
  const failedFunds = [];
  let insertedCount = 0;

  const insertPromises = filteredFunds.map((fund) =>
    limit(async () => {
      const isin = fund.isinGrowth;

      // Skip if already exists in the database
      if (existingSchemeCodes.has(fund.schemeCode) || existingCodes.has(isin)) return;

      try {
        const kuvera = await fetchFundData(isin);

        if (!kuvera || !kuvera.code) throw new Error("Missing Kuvera fund code");

        const exit_load = await fetchExitLoad(kuvera.code);

        await db.mutual_fund.create({
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
            lump_max: kuvera.lump_max.toString(),
            lump_multiplier: kuvera.lump_multiplier,
            sip_min: kuvera.sip_min,
            sip_max: kuvera.sip_max.toString(),
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

        insertedCount++;
        console.log("✅ Inserted:", fund.schemeCode, kuvera.code, isin);

        return { status: "inserted", scheme_code: fund.schemeCode };
      } catch (error) {
        // console.log(`❌ Failed: ${isin} | ${error.message}`);
        failedFunds.push({
          scheme_code: fund.schemeCode,
          scheme_name: fund.schemeName,
          isin: isin,
          reason: error.message,
          timestamp: new Date().toISOString(),
        });

        return { status: "failed", scheme_code: fund.schemeCode, error: error.message };
      }
    })
  );

  await Promise.allSettled(insertPromises);
  await db.$disconnect();

  // Write failed funds file
  await fs.mkdir("logs", { recursive: true });
  await fs.writeFile("logs/unmatched-funds.json", JSON.stringify(failedFunds, null, 2));

  // Log summary
  console.log(`✅ Inserted: ${insertedCount} funds`);
  console.log(`❌ Failed: ${failedFunds.length} funds`);
};

enrichAndInsert();
