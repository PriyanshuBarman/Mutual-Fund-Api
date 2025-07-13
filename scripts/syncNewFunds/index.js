import pLimit from "p-limit";
import { PrismaClient } from "../../generated/prisma/index.js";
import { loadBlacklist } from "./services/blacklistService.js";
import { processSingleFund } from "./services/processSingleFund.js";
import { getFilteredDirectFunds } from "./utils/getFilteredDirectFunds.js";

const limit = pLimit(4);

// Single shared database instance
export const db = new PrismaClient();

export async function syncNewMutualFunds() {
  try {
    // Step 1: Get all current funds from MFAPI
    const allDirectFunds = await getFilteredDirectFunds();

    // Step 2: Get existing funds from database
    const existingFunds = await db.mutual_fund.findMany({
      select: { scheme_code: true },
    });
    const existingSchemeCodes = new Set(existingFunds.map((f) => f.scheme_code));

    // Step 3: Load blacklist
    const blacklist = await loadBlacklist();
    const blacklistedCodes = new Set(blacklist.map((f) => f.scheme_code));

    // Step 4: Filter funds to process
    const fundsToProcess = allDirectFunds.filter(
      (fund) =>
        !existingSchemeCodes.has(fund.schemeCode) && // Not in DB
        !blacklistedCodes.has(fund.schemeCode) // Not blacklisted
    );

    if (fundsToProcess.length === 0) {
      console.log("✅ No new funds to process!");
      return;
    }

    console.log(`⭐ Found ${fundsToProcess.length} new funds to process.`);

    // Step 5: Process 4 funds concurrently
    await Promise.allSettled(fundsToProcess.map((fund) => limit(() => processSingleFund(fund))));

    console.log("✅ Script complete successfully!");

    await db.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Script failed :", error.message);
    await db.$disconnect();
    process.exit(1);
  }
}

syncNewMutualFunds();
