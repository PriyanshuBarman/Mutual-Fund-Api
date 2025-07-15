import { calculateCAGR } from "./calculateCAGR.js";
import { calculateSimpleReturn } from "./calculateSimpleReturn.js";
import { parseDDMMYYYY } from "./parseDDMMYYYY.js";

export function calculateReturns(navData) {
  if (!navData || navData.length < 2) return null;

  const return_1m = calculateSimpleReturn(navData, 31);
  const return_6m = calculateSimpleReturn(navData, 183);

  const return_1y = calculateCAGR(navData, 1);
  const return_3y = calculateCAGR(navData, 3);
  const return_5y = calculateCAGR(navData, 5);

  // Since inception return calculation
  const latestDate = parseDDMMYYYY(navData[0].date);
  const inceptionDate = parseDDMMYYYY(navData[navData.length - 1].date);
  const yearsSinceInception = (latestDate - inceptionDate) / (1000 * 60 * 60 * 24 * 365.25);

  const return_since_inception =
    yearsSinceInception < 1
      ? calculateSimpleReturn(navData, navData.length - 1)
      : calculateCAGR(navData, yearsSinceInception);

  return {
    return_1m: formatReturn(return_1m),
    return_6m: formatReturn(return_6m),
    return_1y: formatReturn(return_1y),
    return_3y: formatReturn(return_3y),
    return_5y: formatReturn(return_5y),
    return_since_inception: formatReturn(return_since_inception),
  };
}

function formatReturn(value) {
  return value !== null && !isNaN(value) ? parseFloat(value.toFixed(2)) : null;
}
