import axios from "axios";

export async function fetchFullFundData(fundCode, failedCount) {
  try {
    const { data } = await axios.get(`${process.env.FULL_FUND_DATA_API}${fundCode}.json`);
    return data[0] || null;
  } catch (error) {
    failedCount++;
    console.error("Error At fetchFullFundData: ", error.message);
    throw new Error(`Error At fetchFullFundData: ${error.message}`);
  }
}
