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
  ...(f.returns && {
    "1y": parseFloat(f.returns.year_1),
    "3y": parseFloat(f.returns.year_3),
    "5y": parseFloat(f.returns.year_5),
    inception: parseFloat(f.returns.inception),
  }),
});
