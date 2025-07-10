import { findNAVMatch } from "../utils/findNAVMatch.js";
import { getFullFundData } from "../utils/getFullFundData.js";
import { getMFApiNAV } from "../utils/getMFApiNAV.js";
import { searchKuvera } from "../utils/searchKuvera.js";
import { validateISIN } from "../utils/validateISIN.js";
import { addToBlacklist } from "./blacklistService.js";
import { insertFundToDatabase } from "./insertFundToDatabase.js";

export async function processSingleFund(fund) {
  // 1: Get NAV from MF API
  const mfNavData = await getMFApiNAV(fund.schemeCode);
  if (!mfNavData) return;

  // 2: Search Kuvera
  const searchQuery = fund.schemeName.split("-")[0].trim();
  const kuveraResults = await searchKuvera(searchQuery);
  if (kuveraResults.length === 0) {
    await addToBlacklist(fund, "No Kuvera search results");
    return;
  }

  // 3: Find NAV match
  const navMatch = findNAVMatch(kuveraResults, mfNavData.nav);
  if (!navMatch) {
    await addToBlacklist(fund, "NAV not matched");
    return;
  }

  // 4: Get full Kuvera data
  const kuveraFullData = await getFullFundData(navMatch.unique_fund_code);
  if (!kuveraFullData) {
    await addToBlacklist(fund, "Failed to get Kuvera full data");
    return;
  }

  // 5: Validate ISIN
  const isValid = validateISIN(fund.isinGrowth, kuveraFullData.ISIN);
  if (!isValid) {
    await addToBlacklist(fund, `ISIN mismatch: ${fund.isinGrowth} != ${kuveraFullData.ISIN}`);
    return;
  }

  // 6: Insert to database
  const inserted = await insertFundToDatabase(fund, kuveraFullData);
  if (!inserted) {
    await addToBlacklist(fund, `Database insertion failed : ${fund.schemeCode}`);
    return;
  }

  // Success!
  console.log(`✅ Inserted: ${fund.schemeCode}`);
}
