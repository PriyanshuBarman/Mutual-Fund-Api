export const buildWhereClause = (query) => {
  const where = {};

  for (const [key, value] of Object.entries(query)) {
    if (!value || ["sort_by", "order_by", "limit", "offset"].includes(key)) continue;

    if (key.endsWith("_gte")) {
      where[key.replace("_gte", "")] = { gte: Number(value) };
      continue;
    }
    if (key.endsWith("_lte")) {
      where[key.replace("_lte", "")] = { lte: Number(value) };
      continue;
    }
    if (key.endsWith("_not")) {
      where[key.replace("_not", "")] = { not: isNaN(value) ? value : Number(value) };
      continue;
    }

    // Multi-select for specific fields
    if (
      key === "amc_name" ||
      key === "amc_code" ||
      key === "category" ||
      key === "fund_category" ||
      key === "crisil_rating"
    ) {
      where[key] = { in: value.split(",") };
      continue;
    }

    // Default: direct value
    where[key] = isNaN(value) ? value : Number(value);
  }

  return where;
};
