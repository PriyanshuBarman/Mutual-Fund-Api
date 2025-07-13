export const buildWhereClause = (query) => {
  const where = {};

  for (const [key, value] of Object.entries(query)) {
    if (!value || ["sort_by", "order_by", "limit"].includes(key)) continue;

    if (key.endsWith("_gte")) {
      where[key.replace("_gte", "")] = { gte: Number(value) };
      continue;
    }
    if (key.endsWith("_lte")) {
      where[key.replace("_lte", "")] = { lte: Number(value) };
      continue;
    }

    // Multi-select for specific fields  (e.g.,fund_name= Tata mutual fund, Axis mutual fund)
    if (key === "fund_name" || key === "fund_house") {
      where[key] = { in: value.split(",") };
      continue;
    }

    // Default: direct value
    where[key] = isNaN(value) ? value : Number(value);
  }

  return where;
};
