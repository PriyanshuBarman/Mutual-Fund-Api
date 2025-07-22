import axios from "axios";

export const fetchFullFundData = async (fundCode) => {
  try {
    const { data } = await axios.get(`${process.env.FULL_FUND_DATA_API}${fundCode}.json`);
    return data[0];
  } catch (error) {
    throw new Error(`Error At fetchFullFundData: ${error.message}`);
  }
};
