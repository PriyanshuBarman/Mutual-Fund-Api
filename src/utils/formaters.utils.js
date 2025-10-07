export const toSafeNumber = (v) => {
  if (v === null || v === undefined) return null;
  if (typeof v === "bigint") return Number(v); // 1n -> 1
  if (typeof v === "string" && /^\d+$/.test(v)) return Number(v);
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
