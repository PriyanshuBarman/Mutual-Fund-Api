export const buildComparisonObject = (f) => ({
  name: f.name,
  short_name: f.short_name,
  code: f.code,
  slug: f.slug,
  fund_rating: f.fund_rating,
  expense_ratio: f.expense_ratio,
  aum: f.aum,
  volatility: f.volatility,
  ISIN: f.ISIN,

  // "1y": parseFloat(f?.return_1y),
  // "3y": parseFloat(f?.return_3y),
  // "5y": parseFloat(f?.return_5y),
  // since_inception: parseFloat(f?.return_inception),

  return_1m: f?.return_1m,
  return_6m: f?.return_6m,
  return_1y: f?.return_1y,
  return_3y: f?.return_3y,
  return_5y: f?.return_5y,
  return_since_inception: f?.return_since_inception,
});
