import { findNAVMatch } from "../utils/findNAVMatch.js";
import { fetchFullFundData } from "../utils/fetchFullFundData.js";
import { fetchMFApiNAV } from "../utils/fetchMFApiNAV.js";
import { searchFund } from "../utils/searchFund.js";
import { validateISIN } from "../utils/validateISIN.js";
import { addToBlacklist } from "./blacklistService.js";
import { insertFundToDatabase } from "./insertFundToDatabase.js";

export async function processSingleFund(fund) {
  try {
    // 1. Get NAV from MF API
    const mfNavData = await fetchMFApiNAV(fund.schemeCode);

    // 2. Search Fund on Search API
    const searchQuery = fund.schemeName.split("-")[0].trim();
    const searchResults = await searchFund(searchQuery);
    if (searchResults.length === 0) {
      await addToBlacklist(fund, "No Search API results");
      return;
    }

    // 3. Find NAV match
    const navMatch = findNAVMatch(searchResults, mfNavData.nav);
    if (!navMatch) {
      await addToBlacklist(fund, "NAV not matched");
      return;
    }

    // 4. Fetch full fund data
    const fullFundData = await fetchFullFundData(navMatch.unique_fund_code);

    // 5. Validate ISIN
    const isValid = validateISIN(fund.isinGrowth, fullFundData.ISIN);
    if (!isValid) {
      await addToBlacklist(
        fund,
        `ISIN mismatch: ${fund.isinGrowth} != ${fullFundData.ISIN}`
      );
      return;
    }

    // 6. Validate Plan
    if (fund.plan !== "GROWTH") {
      await addToBlacklist(fund, "Not Growth Plan");
      return;
    }

    // 7. Insert to database
    await insertFundToDatabase(fund, fullFundData);

    console.log(
      `✅ Inserted: ${fullFundData.name}, ISIN: ${fullFundData.ISIN}`
    );
  } catch (error) {
    console.error(
      `⚠️ Failed (will be retried): ${fund.schemeName} - ${error.message}`
    );
  }
}
