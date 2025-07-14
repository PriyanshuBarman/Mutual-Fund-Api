import db from "../config/db.config.js";
import { mergeComparisonArr } from "../services/singleRetrieval.service.js";
import ApiError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getFundByISIN = asyncHandler(async (req, res) => {
  const { isin } = req.params;

  if (!isin) throw new ApiError(400, "ISIN is required");

  const fund = await db.mutual_fund.findUnique({
    where: { ISIN: isin },
  });

  if (!fund) throw new ApiError(404, `Fund not found for ISIN: ${isin}`);

  const fullData = await mergeComparisonArr(fund);

  res.status(200).json({ success: true, fund: fullData });
});

export const getFundByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) throw new ApiError(400, "code is required");

  const fund = await db.mutual_fund.findUnique({
    where: { code },
  });

  if (!fund) throw new ApiError(404, `Fund not found for code: ${code}`);

  const fullData = await mergeComparisonArr(fund);

  res.status(200).json({ success: true, fund: fullData });
});

export const getFundBySchemeCode = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;

  if (!schemeCode) throw new ApiError(400, "Scheme code is required");

  const fund = await db.mutual_fund.findUnique({
    where: {
      scheme_code: parseInt(schemeCode),
    },
  });

  if (!fund) throw new ApiError(404, `Fund not found for scheme code: ${schemeCode}`);
  
  const fullData = await mergeComparisonArr(fund);

  res.status(200).json({ success: true, fund: fullData });
});
