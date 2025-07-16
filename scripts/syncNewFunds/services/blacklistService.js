import db from "../../config/db.js";

export async function loadBlacklist() {
  try {
    const blacklistedFunds = await db.blacklisted_fund.findMany();
    return blacklistedFunds;
  } catch (error) {
    console.error("Error at loadBlacklist:", error);
  }
}

export async function addToBlacklist(fund, errorMessage) {
  try {
    await db.blacklisted_fund.create({
      data: {
        scheme_code: fund.schemeCode,
        scheme_name: fund.schemeName,
        isin: fund.isinGrowth,
        reason: errorMessage,
      },
    });
  } catch (error) {
    console.error("Error adding to blacklist:", error);
  }
}
