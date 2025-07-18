import axios from "axios";
import pLimit from "p-limit";
import db from "../config/db.js";
import { getAllFunds } from "./services/getAllFunds.js";
import { updateNavAndReturns } from "./services/updateNavAndReturns.js";
import { getReturns } from "./utils/getReturns.js";
import { parseDDMMYYYY } from "./utils/parseDDMMYYYY.js";
import { getDayChangePercent } from "./utils/returnCalculator.js";

const limit = pLimit(50);

async function dailyUpdater() {
  console.log("🚀 Daily Updater started..");

  let updatedCount = 0;
  let failedCount = 0;

  const allFunds = await getAllFunds();

  const updatePromises = allFunds.map(({ id, scheme_code, nav }) =>
    limit(async () => {
      try {
        const { data } = await axios.get(`https://api.mfapi.in/mf/${scheme_code}`);
        const navData = data?.data;

        if (!Array.isArray(navData) || navData.length < 2) {
          console.log(`⚠️ Skipping ${scheme_code}: insufficient NAV data`);
        }

        // Skip if NAV date not updated (i.e., no new NAV)
        const apiNavDate = parseDDMMYYYY(navData[0].date);
        const dbNavDate = new Date(nav?.date);
        if (apiNavDate <= dbNavDate || !apiNavDate) return;

        // Get new return percentages & dayChangePercent
        const returnsObject = getReturns(navData);
        const dayChangePercent = getDayChangePercent(navData);

        // Update database
        await updateNavAndReturns(id, navData, returnsObject, dayChangePercent);

        updatedCount++;
      } catch (error) {
        failedCount++;
        console.error(`❌ Failed  ${scheme_code} (ID: ${id}):`, error.message);
      }
    })
  );

  await Promise.allSettled(updatePromises);

  console.log("\n📈 Summary: ");
  console.log(`✅ Updated: ${updatedCount} / ${allFunds.length} funds`);
  console.log(`❌ Failed: ${failedCount} funds`);

  await db.$disconnect();
  failedCount === 0 ? process.exit(0) : process.exit(1);
}

dailyUpdater().catch(async (error) => {
  console.error("🔴⭕ Error in Daily Updater:", error);
  await db.$disconnect();
  process.exit(1);
});
