import { calculateCAGR, calculateSimpleReturn, calculateSinceInceptionReturn } from "./returnCalculator.js";

export function getReturns(navData) {
  const return_1m = calculateSimpleReturn(navData, 30); // 1 month
  const return_6m = calculateSimpleReturn(navData, 181); // 6 months

  const return_1y = calculateCAGR(navData, 1); // 1 year
  const return_3y = calculateCAGR(navData, 3); // 3 years
  const return_5y = calculateCAGR(navData, 5); // 5 years

  const return_since_inception = calculateSinceInceptionReturn(navData); // since inception return

  return {
    return_1m: return_1m,
    return_6m: return_6m,
    return_1y: return_1y,
    return_3y: return_3y,
    return_5y: return_5y,
    return_since_inception: return_since_inception,
  };
}
