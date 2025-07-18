import db from "../config/db.js";
import { fetchFullFundData } from "./services/fetchFullFundData.js";
import { updateFundData } from "./services/updateFundData.js";
import { mapFullDataToDatabase } from "./utils/dataMapper.js";

export async function weeklyUpdateFunds() {
  console.log("🚀 Weekly Updater started..");

  const allFunds = await db.mutual_fund.findMany({
    select: { id: true, code: true },
  });

  const BATCH_SIZE = 50;
  let updatedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < allFunds.length; i += BATCH_SIZE) {
    const batch = allFunds.slice(i, i + BATCH_SIZE);

    //  Call all 50 APIs in parallel
    const apiPromises = batch.map(({ id, code }) =>
      fetchFullFundData(code, failedCount).then((fundData) => ({ id, fundData }))
    );

    const apiResponses = await Promise.allSettled(apiPromises);

    //  Update DB
    const dbUpdatePromises = apiResponses.map((res) => {
      if (res.status !== "fulfilled") return;

      const { id, fundData } = res.value;
      const mappedData = mapFullDataToDatabase(fundData);
      updatedCount++;

      return updateFundData(id, mappedData, failedCount);
    });

    await Promise.allSettled(dbUpdatePromises);
  }

  // Log summary & exit
  console.log("\n📈 Summary: ");
  console.log(`✅ Updated: ${updatedCount} / ${allFunds.length} funds`);
  console.log(`❌ Failed: ${failedCount} funds`);

  await db.$disconnect();
  process.exit(failedCount === 0 ? 0 : 1);
}

weeklyUpdateFunds().catch(async (error) => {
  console.error("⭕ Error in Weekly Updater:", error);
  await db.$disconnect();
  process.exit(1);
});
