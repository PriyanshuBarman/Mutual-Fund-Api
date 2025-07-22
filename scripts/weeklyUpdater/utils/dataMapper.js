export function mapFullDataToDatabase(fullData) {
  try {
    return {
      // 🔁 Change Frequently (Daily or Weekly)
      aum: parseInt(fullData.aum) || 0,
      expense_ratio: parseFloat(fullData.expense_ratio) || null,
      expense_ratio_date: fullData.expense_ratio_date || null,

      // 📅 Change Occasionally (Monthly or Quarterly)
      crisil_rating: fullData.crisil_rating || "",
      portfolio_turnover: fullData.portfolio_turnover?.toString() || "0",
      fund_rating: parseInt(fullData.fund_rating) || 0,
      fund_rating_date: fullData.fund_rating_date || null,

      // 🟢 Change Rarely
      fund_manager: fullData.fund_manager || "",
      lump_available: fullData.lump_available || "N",
      sip_available: fullData.sip_available || "N",
      lump_min: parseFloat(fullData.lump_min) || 0,
      lump_min_additional: parseFloat(fullData.lump_min_additional) || 0,
      sip_min: parseInt(fullData.sip_min) || 0,
      redemption_allowed: fullData.redemption_allowed || "N",
      redemption_amount_minimum: parseInt(fullData.redemption_amount_minimum) || 0,
      redemption_quantity_minimum: parseFloat(fullData.redemption_quantity_minimum) || 0.001,
      lock_in_period: parseInt(fullData.lock_in_period) || 0,
      insta_redeem_min_amount: parseFloat(fullData.insta_redeem_min_amount) || 0,
      investment_objective: fullData.investment_objective || "",
      instant: fullData.instant || "N",

      // 📝 Optional (Mostly Static)
      redemption_quantity_multiple: parseFloat(fullData.redemption_quantity_multiple) || 0.001,
      lump_max: fullData.lump_max?.toString() || "0",
      lump_multiplier: parseInt(fullData.lump_multiplier) || 1,
      sip_max: fullData.sip_max?.toString() || "0",
      sip_multiplier: parseInt(fullData.sip_multiplier) || 1,
      sip_maximum_gap: parseInt(fullData.sip_maximum_gap) || 0,
      redemption_amount_multiple: parseInt(fullData.redemption_amount_multiple) || 1,
      insta_redeem_max_amount: parseFloat(fullData.insta_redeem_max_amount) || 0,
      switch_allowed: fullData.switch_allowed || "N",
      stp_flag: fullData.stp_flag || "N",
      swp_flag: fullData.swp_flag || "N",
      reinvestment: fullData.reinvestment || "N",
    };
  } catch (error) {
    throw new Error(`Data mapping failed: ${error.message}`);
  }
}
