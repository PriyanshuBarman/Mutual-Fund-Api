export function findNAVMatch(kuveraFunds, targetNAV) {
  return kuveraFunds.find((fund) => {
    const fundNAV = parseFloat(fund.current_nav);
    const difference = Math.abs(fundNAV - targetNAV);

    // Check if difference passes tolerance
    const passes = difference <= 4.0;

    // Log if the difference passes
    if (passes) {
      console.log(`Match found: ${fundNAV} vs ${targetNAV}, diff: ${difference}`);
    }

    return passes;
  });
}
