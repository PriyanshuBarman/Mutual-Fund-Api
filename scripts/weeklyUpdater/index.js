import db from "../../config/db.js";
import { fetchFullFundData } from "./services/fetchFullFundData.js";
import { updateFundData } from "./services/updateFundData.js";
import { mapFullDataToDatabase } from "./utils/dataMapper.js";

export async function weeklyUpdateFunds() {
  await db.$disconnect();

  console.log("🚀 Weekly Updater started..");

  const allFunds = await db.mutual_fund.findMany({
    select: { id: true, code: true },
  });

  const BATCH_SIZE = 50;
  let updatedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < allFunds.length; i += BATCH_SIZE) {
    const batch = allFunds.slice(i, i + BATCH_SIZE);

    const apiPromises = batch.map(async ({ id, code }) => {
      try {
        // call 50 api's in parallel
        const fundData = await fetchFullFundData(code);

        // update database
        const mappedData = mapFullDataToDatabase(fundData);
        await updateFundData(id, mappedData);
        updatedCount++;
      } catch (error) {
        failedCount++;
        console.error("❌", error.message);
      }
    });

    await Promise.allSettled(apiPromises);

    // 10s delay after every batch
    await new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });
  }

  // Log summary & exit
  console.log(" ------------- Summary------------- ");
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
