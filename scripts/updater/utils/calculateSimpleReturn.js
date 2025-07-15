import { getNavNDaysAgo } from "./getNavNDaysAgo.js";

export function calculateSimpleReturn(navData, days) {
  const start = getNavNDaysAgo(navData, days);
  return start ? ((navData[0].nav - start.nav) / start.nav) * 100 : null;
}
