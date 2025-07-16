import { getNavNDaysAgo } from "./getNavNDaysAgo.js";
import { parseDDMMYYYY } from "./parseDDMMYYYY.js";

export function calculateSimpleReturn(navData, days) {
  const start = getNavNDaysAgo(navData, days);
  if (!start) return null;

  const percent = ((navData[0].nav - start.nav) / start.nav) * 100;
  return parseFloat(percent.toFixed(2));
}

export function calculateCAGR(navData, year) {
  const latestNav = navData[0].nav;
  const start = getNavNDaysAgo(navData, year * 365.25);

  if (!start) return null;

  const startNav = start.nav;
  if (!startNav || !latestNav || year <= 0) return null;

  const percent = ((latestNav / startNav) ** (1 / year) - 1) * 100;
  return parseFloat(percent.toFixed(2));
}

export function calculateSinceInceptionReturn(navData) {
  const latestDate = parseDDMMYYYY(navData[0].date);
  const inceptionDate = parseDDMMYYYY(navData[navData.length - 1].date);
  const yearsSinceInception = (latestDate - inceptionDate) / (1000 * 60 * 60 * 24 * 365.25);

  let percent;

  if (yearsSinceInception < 1) {
    // New fund: Calculate from estimated face value
    const currentNav = navData[0].nav;
    const estimatedFaceValue = Math.floor(navData[navData.length - 1].nav);

    percent = ((currentNav - estimatedFaceValue) / estimatedFaceValue) * 100;
  } else {
    // Mature fund: Use CAGR from actual inception
    percent = calculateCAGR(navData, yearsSinceInception);

    // If calculateCAGR already returned a formatted number, return it as is
    if (percent !== null) return percent;
  }

  return percent !== null ? parseFloat(percent.toFixed(2)) : null;
}
