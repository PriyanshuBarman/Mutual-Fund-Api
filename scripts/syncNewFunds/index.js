import pLimit from "p-limit";
import db from "../config/db.js";
import { processSingleFund } from "./services/processSingleFund.js";
import { fetchNewFunds } from "./services/fetchNewFunds.js";

const limit = pLimit(4);

export async function syncNewMutualFunds() {
  try {
    const newFunds = await fetchNewFunds();

    if (!newFunds.length) return console.log("✅ No new funds to process!");

    console.log(`🆕 ${newFunds.length} New funds found`);

    const processNewFundPromises = newFunds.map((fund) => limit(() => processSingleFund(fund)));

    await Promise.allSettled(processNewFundPromises);

    console.log("✅ Script complete successfully");

    await db.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Script failed :", error.message);
    await db.$disconnect();
    process.exit(1);
  }
}

syncNewMutualFunds();
