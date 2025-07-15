import { getNavNDaysAgo } from "./getNavNDaysAgo.js";

export function calculateCAGR(navData, year) {
  const latestNav = navData[0].nav;

  const start = getNavNDaysAgo(navData, year * 365.25);
  if (!start) return null;

  const startNav = start.nav;

  if (!startNav || !latestNav || year <= 0) return null;

  return ((latestNav / startNav) ** (1 / year) - 1) * 100;
}
