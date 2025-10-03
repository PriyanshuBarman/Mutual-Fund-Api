import axios from "axios";
import db from "../../../config/db.js";
import { loadBlacklist } from "./blacklistService.js";

export const fetchNewFunds = async () => {
  try {
    // Step 1: Fetch all Mutual Funds
    const { data } = await axios.get(process.env.MF_API_BASE_URL);

    // Step 2: Filter Active Direct Mutual Funds
    const directFunds = data.filter(
      (item) =>
        item.schemeName.toLowerCase().includes("direct") &&
        item.isinGrowth !== null &&
        item.isinGrowth !== undefined &&
        !item.schemeName.toLowerCase().includes("idcw") &&
        !item.schemeName.toLowerCase().includes("dividend") &&
        !item.schemeName.toLowerCase().includes("regular")
    );

    // Step 3: Get all existing funds from database
    const existingFunds = await db.mutual_fund.findMany({
      select: { scheme_code: true },
    });

    const existingSchemeCodes = new Set(
      existingFunds.map((f) => f.scheme_code)
    );

    // Step 4: Load blacklist funds
    const blacklist = await loadBlacklist();
    const blacklistedCodes = new Set(blacklist.map((f) => f.scheme_code));

    // Step 5: Filter new funds
    const newFunds = directFunds.filter(
      (fund) =>
        !existingSchemeCodes.has(fund.schemeCode) && // Not in DB
        !blacklistedCodes.has(fund.schemeCode) // Not blacklisted
    );

    return newFunds;
  } catch (error) {
    throw new Error(`Error at fetchNewFunds: ${error.message}`);
  }
};
