import db from "../config/db.config.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import ApiError from "../utils/apiError.utils.js";

export const getFundByIsin = asyncHandler(async (req, res) => {
  const { isin } = req.params;

  if (!isin) throw new ApiError(400, "ISIN is required");

  const fund = await db.mutual_fund.findUnique({
    where: {
      ISIN: isin.toUpperCase(),
    },
  });

  if (!fund) throw new ApiError(404, "Fund not found");

  res.json({ success: true, fund });
});

export const getFundByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) throw new ApiError(400, "Fund code is required");

  const fund = await db.mutual_fund.findUnique({
    where: { code },
  });

  if (!fund) throw new ApiError(404, "Fund not found");

  res.json({ success: true, fund });
});

export const getFundBySchemeCode = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;

  if (!schemeCode) throw new ApiError(400, "Scheme code is required");

  const fund = await db.mutual_fund.findUnique({
    where: {
      scheme_code: parseInt(schemeCode),
    },
  });

  if (!fund) throw new ApiError(404, "Fund not found");

  res.json({ success: true, fund });
});
