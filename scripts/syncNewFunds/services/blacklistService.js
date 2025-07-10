// services/blacklistService.js
import { db } from "../index.js";

export async function loadBlacklist() {
  try {
    const blacklistedFunds = await db.blacklisted_fund.findMany();
    return blacklistedFunds;
  } catch (error) {
    console.log("📝 No blacklisted funds found in database");
    return [];
  }
}

export async function addToBlacklist(fund, errorMessage) {
  try {
    // Create new blacklist entry
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

export async function getBlacklistStats() {
  try {
    const total = await db.blacklisted_fund.count();
    const reasonStats = await db.blacklisted_fund.groupBy({
      by: ["reason"],
      _count: { reason: true },
    });

    return {
      total,
      reasons: reasonStats.reduce((acc, item) => {
        acc[item.reason] = item._count.reason;
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error("Error getting blacklist stats:", error);
    return { total: 0, reasons: {} };
  }
}
