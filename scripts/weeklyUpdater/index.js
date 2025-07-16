import db from "../config/db.js";
import { fetchFullFundData } from "./services/fetchFullFundData.js";
import { updateFundData } from "./services/updateDatabase.js";
import { mapFullDataToDatabase } from "./utils/dataMapper.js";

async function weeklyUpdateFunds() {
  console.log("🚀 Weekly Updater started..");

  // Get all fund codes from database
  const allFunds = await db.mutual_fund.findMany({
    select: {
      id: true,
      code: true,
      name: true,
    },
  });

  let updatedCount = 0;
  let failedCount = 0;

  for (const fund of allFunds) {
    try {
      // Fetch full fund data
      const fullData = await fetchFullFundData(fund.code);

      // Map Full data to database format
      const mappedData = mapFullDataToDatabase(fullData);

      // Update database
      await updateFundData(fund.id, mappedData);

      updatedCount++;
    } catch (error) {
      failedCount++;
      console.error(`❌ Failed: ${fund.name} (code: ${fund.code}) ||  ${error.message}`);
    }
  }

  console.log("\n📈 Summary: ");
  console.log(`✅ Updated: ${updatedCount} / ${allFunds.length} funds`);
  console.log(`❌ Failed : ${failedCount} funds`);

  await db.$disconnect();
  failedCount === 0 ? process.exit(0) : process.exit(1);
}

weeklyUpdateFunds().catch(async (error) => {
  console.error("🔴⭕ Error in Weekly Updater:", error);
  await db.$disconnect();
  process.exit(1);
});
