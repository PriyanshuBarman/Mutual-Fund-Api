import axios from "axios";
import { PrismaClient } from "../../generated/prisma/index.js";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function getFilteredDirectFunds() {
  const { data } = await axios.get("https://api.mfapi.in/mf");

  const filtered = data.filter(
    (item) =>
      item.isinGrowth !== null &&
      item.isinGrowth !== undefined &&
      item.schemeName.includes("Direct")
  );

  console.log(`🔎 Filtered ${filtered.length} direct funds with ISIN`);
  return filtered.slice(0, 10);
}

async function enrichAndStoreFunds(filteredData) {
  const failedFunds = [];

  for (const fund of filteredData) {
    const isin = fund.isinGrowth;

    try {
      const { data } = await axios.get(`https://mf.captnemo.in/kuvera/${isin}`);
      console.log(data[0]);
      const kuvera = data[0];

      if (!kuvera.code) {
        throw new Error("Missing kuveraCode in API response");
      }

      await prisma.mutualFund.create({
        data: {
          schemeCode: fund.schemeCode,
          schemeName: fund.schemeName,
          isin: isin,
          kuveraCode: kuvera.code,
        },
      });

      console.log(`✅ Inserted: ${fund.schemeName}`);
    } catch (error) {
      failedFunds.push({
        schemeCode: fund.schemeCode,
        schemeName: fund.schemeName,
        isin: isin,
        reason: error.message,
      });

      console.log(`❌ Failed: ${fund.schemeName} — ${error.message}`);
    }
  }

  await fs.writeFile(
    "unmatched-funds.json",
    JSON.stringify(failedFunds, null, 2)
  );

  console.log(`📝 Failed funds written to unmatched-funds.json`);
  console.log(
    `✅ Done! Success: ${filteredData.length - failedFunds.length}, Failed: ${
      failedFunds.length
    }`
  );
}

/**
 * Main runner
 */
async function run() {
  try {
    const filteredFunds = await getFilteredDirectFunds();
    await enrichAndStoreFunds(filteredFunds);
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

export default run;
