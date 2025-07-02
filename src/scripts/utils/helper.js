import axios from "axios";

export const getFilteredDirectFunds = async () => {
  const { data } = await axios.get("https://api.mfapi.in/mf");

  const filtered = data.filter(
    (item) =>
      item.isinGrowth !== null &&
      item.isinGrowth !== undefined &&
      item.schemeName.includes("Direct")
  );

  console.log(`🔎 Found ${filtered.length} direct funds with ISIN`);
  return filtered;
};

export const fetchFundData = async (isin) => {
  const { data } = await axios.get(`https://mf.captnemo.in/kuvera/${isin}`);
  return data[0];
};

export const fetchExitLoad = async (code) => {
  const { data } = await axios.get(
    `https://api.kuvera.in/mf/api/v5/fund_exit_loads/${code}.json`
  );
  return data[0].exit_load[0] || "N/A";
};
