import pLimit from "p-limit";
import { fetchFullFundData } from "./services/fetchFullFundData.js";
import { updateFundData } from "./services/updateDatabase.js";
import { mapFullDataToDatabase } from "./utils/dataMapper.js";
import db from "../config/db.js";

const limit = pLimit(4);

async function weeklyUpdateFunds() {
  console.log("🚀 Starting weekly fund data update...");

  let updatedCount = 0;
  const failedFunds = [];

  try {
    // Get all fund codes from database
    const allFunds = await db.mutual_fund.findMany({
      select: {
        id: true,
        code: true,
        name: true,
      },
    });

    // Process funds with concurrency limit
    const updatePromises = allFunds.map((fund) =>
      limit(async () => {
        try {
          // Fetch full fund data
          const fullData = await fetchFullFundData(fund.code);

          if (!fullData) {
            throw new Error("No data received from Kuvera API");
          }

          // Map Full data to database format
          const mappedData = mapFullDataToDatabase(fullData);

          // Update database
          await updateFundData(fund.id, mappedData);

          updatedCount++;
          // console.log(`✅ Updated: ${fund.name}`);

          return { success: true, fundId: fund.id, fundCode: fund.code };
        } catch (error) {
          failedFunds.push({
            id: fund.id,
            code: fund.code,
            name: fund.name,
            error: error.message,
          });
          console.error(`❌ Failed: ${fund.name} ||  ${error.message}`);
        }
        return { success: false, fundId: fund.id, fundCode: fund.code };
      })
    );

    await Promise.allSettled(updatePromises);

    // Summary
    console.log("\n📈 Weekly Update Summary:");
    console.log(`✅ Successfully updated: ${updatedCount} funds`);
    console.log(`❌ Failed updates: ${failedFunds.length} funds`);

    await db.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("🔴⭕ Critical error in weekly update:", error);
    await db.$disconnect();
    process.exit(1);
  }
}

weeklyUpdateFunds().catch(console.error);
