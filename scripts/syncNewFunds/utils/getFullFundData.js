import axios from "axios";

export async function getFullFundData(fundCode) {
  try {
    const { data } = await axios.get(`${process.env.FULL_FUND_DATA_API}${fundCode}.json`);

    return data[0] || null;
  } catch (error) {
    console.error(`error while calling Kuvera Fund API for fund ${fundCode}:`, error.message);
    return null;
  }
}
