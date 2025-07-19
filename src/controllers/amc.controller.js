import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getAMCs = asyncHandler(async (req, res) => {
  // Get all fund houses/AMCs with counts in a single query
  const fundHousesWithCounts = await db.$queryRaw`
    SELECT 
      amc_name, 
      short_code,
      detail_info,
      COUNT(*) as total_funds,
      MIN(amc_name) as amc_name
    FROM mutual_fund
    GROUP BY amc_name, short_code, detail_info
    ORDER BY amc_name ASC
  `;

  // Get all categories with counts in a single query
  const categoriesWithCounts = await db.$queryRaw`
    SELECT 
      amc_name, 
      category, 
      COUNT(*) as count 
    FROM mutual_fund 
    GROUP BY amc_name, category
  `;

  // Process the results
  const fundHouseMap = new Map();

  // Initialize fund houses
  fundHousesWithCounts.forEach((fh) => {
    fundHouseMap.set(fh.amc_name, {
      amc_name: fh.amc_name,
      short_code: fh.short_code,
      detail_info: fh.detail_info,
      total_funds: Number(fh.total_funds),
      categories: [],
    });
  });

  // Add categories
  categoriesWithCounts.forEach((cat) => {
    const amc = fundHouseMap.get(cat.amc_name);
    if (amc) {
      amc.categories.push({
        name: cat.category,
        count: Number(cat.count),
      });
    }
  });

  const amcs = Array.from(fundHouseMap.values());

  res.status(200).json({ success: true, count: amcs.length, amcs });
});
