import db from "../../../config/db.js";
import { fetchExitLoad } from "../utils/fetchExitLoad.js";

export async function insertFundToDatabase(originalFund, fullFundData) {
  try {
    const exit_load = await fetchExitLoad(fullFundData.code);

    return await db.mutual_fund.create({
      data: {
        scheme_code: originalFund.schemeCode,
        code: fullFundData.code,
        name: fullFundData.name,
        small_screen_name: fullFundData.small_screen_name.replace(" (G)", " Fund"),
        exit_load: exit_load,
        short_name: fullFundData.short_name + " Fund",
        lump_available: fullFundData.lump_available,
        sip_available: fullFundData.sip_available,
        lump_min: fullFundData.lump_min,
        lump_min_additional: fullFundData.lump_min_additional,
        lump_max: fullFundData.lump_max.toString(),
        lump_multiplier: fullFundData.lump_multiplier,
        sip_min: fullFundData.sip_min,
        sip_max: fullFundData.sip_max.toString(),
        sip_multiplier: fullFundData.sip_multiplier,
        redemption_allowed: fullFundData.redemption_allowed,
        redemption_amount_multiple: fullFundData.redemption_amount_multiple,
        redemption_amount_minimum: fullFundData.redemption_amount_minimum,
        redemption_quantity_multiple: fullFundData.redemption_quantity_multiple,
        redemption_quantity_minimum: fullFundData.redemption_quantity_minimum,
        category: fullFundData.category,
        lock_in_period: fullFundData.lock_in_period,
        sip_maximum_gap: fullFundData.sip_maximum_gap,
        amc_code: fullFundData.fund_house,
        amc_name: fullFundData.fund_name,
        short_code: fullFundData.short_code,
        detail_info: fullFundData.detail_info,
        ISIN: fullFundData.ISIN,
        direct: fullFundData.direct,
        switch_allowed: fullFundData.switch_allowed,
        stp_flag: fullFundData.stp_flag,
        swp_flag: fullFundData.swp_flag,
        instant: fullFundData.instant,
        reinvestment: fullFundData.reinvestment,
        slug: fullFundData.slug,
        channel_partner_code: fullFundData.channel_partner_code,
        tax_period: fullFundData.tax_period,
        insta_redeem_min_amount: fullFundData.insta_redeem_min_amount,
        insta_redeem_max_amount: fullFundData.insta_redeem_max_amount,
        start_date: fullFundData.start_date,
        face_value: fullFundData.face_value,
        fund_type: fullFundData.fund_type,
        fund_category: fullFundData.fund_category,
        plan: fullFundData.plan,
        expense_ratio: parseFloat(fullFundData.expense_ratio),
        expense_ratio_date: fullFundData.expense_ratio_date,
        fund_manager: fullFundData.fund_manager,
        crisil_rating: fullFundData.crisil_rating,
        investment_objective: fullFundData.investment_objective,
        portfolio_turnover: fullFundData.portfolio_turnover,
        maturity_type: fullFundData.maturity_type,
        aum: fullFundData.aum,
        fund_rating: fullFundData.fund_rating,
        fund_rating_date: fullFundData.fund_rating_date,
        nav: { nav: fullFundData.nav.nav, date: new Date(fullFundData.nav.date) },
      },
    });
  } catch (error) {
    throw new Error(`Error inserting fund ${fullFundData.code} into database: ${error.message}`);
  }
}
