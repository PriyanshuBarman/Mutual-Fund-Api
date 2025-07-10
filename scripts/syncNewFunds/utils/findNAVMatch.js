export function findNAVMatch(kuveraFunds, targetNAV) {
  // Try exact match first
  const exactMatch = kuveraFunds.find((fund) => parseFloat(fund.current_nav) === targetNAV);

  if (exactMatch) return exactMatch;

  // Try with small tolerance for rounding
  return kuveraFunds.find((fund) => {
    const fundNAV = parseFloat(fund.current_nav);
    return Math.abs(fundNAV - targetNAV) <= 0.001;
  });
}
