import axios from "axios";

export const fetchFundData = async (isin) => {
  const { data } = await axios.get(`${process.env.THIRD_PARTY_API}${isin}`);
  return data[0];
};
