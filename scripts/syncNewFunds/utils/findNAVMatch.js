
export function findNAVMatch(funds, targetNAV) {

  return funds.find((fund) => {
    const fundNAV = parseFloat(fund.current_nav);
    const difference = Math.abs(fundNAV - targetNAV);

    // Check if difference passes tolerance
    const passes = difference <= 2.0;
    return passes;
  });

}
