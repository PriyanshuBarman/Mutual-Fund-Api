import db from "../../config/db.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getAMCs = asyncHandler(async (req, res) => {
  const amcs = await db.$queryRaw`
  SELECT 
  amc_code,
  ANY_VALUE(amc_name) AS amc_name,
  ANY_VALUE(detail_info) AS detail_info,
  SUM(aum) AS aum,
  COUNT(*) AS fundCount
  FROM mutual_fund
  GROUP BY amc_code
  ORDER BY aum DESC;
`;

  // Convert BigInt to Number
  const serializedAmcs = amcs.map((amc) => ({
    amc_code: amc.amc_code,
    amc_name: amc.amc_name,
    detail_info: amc.detail_info,
    aum: Number(amc.aum),
    fundCount: Number(amc.fundCount),
  }));

  res.status(200).json({
    success: true,
    count: serializedAmcs.length,
    amcs: serializedAmcs,
  });
});

export const getAmcFunds = asyncHandler(async (req, res) => {
  const { amcCode } = req.params;

  // 1. Fetch all funds for the AMC
  const funds = await db.mutual_fund.findMany({
    where: { amc_code: amcCode },
    select: {
      name: true,
      scheme_code: true,
      short_name: true,
      ISIN: true,
      fund_type: true,
      fund_category: true,
      detail_info: true,
      return_1y: true,
      return_3y: true,
      return_5y: true,
      return_since_inception: true,
      expense_ratio: true,
      fund_rating: true,
      aum: true,
      sip_min: true,
      lump_min: true,
    },
  });

  // 2. Group by fund_type/category
  const categories = funds.reduce((acc, fund) => {
    if (!acc[fund.fund_type]) {
      acc[fund.fund_type] = [];
    }
    acc[fund.fund_type].push(fund);
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    count: funds.length,
    categories,
  });
});
