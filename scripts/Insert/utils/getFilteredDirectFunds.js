import axios from "axios";

export const getFilteredDirectFunds = async () => {
  const { data } = await axios.get("https://api.mfapi.in/mf");

  const filtered = data.filter(
    (item) => item.isinGrowth !== null && item.isinGrowth !== undefined && item.schemeName.includes("Direct")
  );

  return filtered;
};



