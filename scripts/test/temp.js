import pLimit from "p-limit";
import db from "../../src/config/db.config.js";

const limit = pLimit(4);

// Not used in script

async function updateFundNames() {
  const allFunds = await db.mutual_fund.findMany();
  let updateCount = 0;

  const updateTasks = allFunds.map((fund) =>
    limit(async () => {
      const newShortName = fund.short_name.replace(/(?<!\s)Fund/, " Fund");
      const newSmallScreenName = fund.small_screen_name.replace(" (G)", " Fund");

      // Only update if something actually changed
      const shouldUpdate = newShortName !== fund.short_name || newSmallScreenName !== fund.small_screen_name;

      if (!shouldUpdate) return;

      await db.mutual_fund.update({
        where: { code: fund.code },
        data: {
          short_name: newShortName,
          small_screen_name: newSmallScreenName,
        },
      });
      updateCount++;
    })
  );

  await Promise.all(updateTasks);
  console.log("✅ Updated", updateCount);
}

updateFundNames()
  .catch(console.error)
  .finally(() => db.$disconnect());
