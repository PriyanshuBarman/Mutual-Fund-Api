import axios from "axios";
import pLimit from "p-limit";
import { PrismaClient } from "../../generated/prisma/index.js";
import { calculateReturns } from "./utils/calculateReturns.js";
import { getTodayDate } from "./utils/getTodayDate.js";
import { parseDDMMYYYY } from "./utils/parseDDMMYYYY.js";

const db = new PrismaClient();
const today = getTodayDate();

async function updateNavAndReturns() {
  const allFunds = await db.mutual_fund.findMany({
    select: {
      id: true,
      scheme_code: true,
      nav: true,
    },
    where: {
      OR: [{ last_updated: { lt: today } }, { last_updated: null }],
    },
  });

  console.log("Funds to update:", allFunds.length);

  const failedFunds = [];
  let updatedCount = 0;
  const limit = pLimit(4);

  const updatePromises = allFunds.map(({ id, scheme_code, nav }) =>
    limit(async () => {
      try {
        const { data } = await axios.get(`https://api.mfapi.in/mf/${scheme_code}`);
        const navData = data?.data;

        if (!Array.isArray(navData) || navData.length < 2) {
          console.warn(`⚠️ Skipping ${scheme_code}: insufficient NAV data`);
          failedFunds.push({ scheme_code, reason: "Insufficient NAV data" });
          return { success: false, scheme_code, error: "Insufficient NAV data" };
        }

        // Skip if NAV date not updated (i.e., no new NAV)
        const apiNavDate = parseDDMMYYYY(navData[0].date);
        const dbNavDate = parseDDMMYYYY(nav?.date);
        if (apiNavDate <= dbNavDate || !apiNavDate) return;

        // Calculate & Update
        const returnsObject = calculateReturns(navData);

        await db.mutual_fund.update({
          where: { id },
          data: {
            nav: { nav: navData[0].nav, date: navData[0].date },
            ...returnsObject,
            last_updated: today,
          },
        });

        updatedCount++;

        return { success: true, scheme_code, id };
      } catch (err) {
        failedFunds.push({ scheme_code, id, reason: err.message });
        console.error(`❌ Failed  ${scheme_code} (ID: ${id}):`, err.message);
        return { success: false, scheme_code, id, error: err.message };
      }
    })
  );

  await Promise.allSettled(updatePromises);

  await db.$disconnect();

  // Log Summary
  if (failedFunds.length) {
    console.log(`❌ Failed: ${failedFunds.length} funds`);
    process.exit(1);
  } else {
    console.log(`✅ Updated ${updatedCount} / ${allFunds.length} `);
    process.exit(0);
  }
}

updateNavAndReturns();
