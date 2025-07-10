import axios from "axios";
import { addToBlacklist } from "../services/blacklistService.js";

export async function getMFApiNAV(schemeCode) {
  try {
    const { data } = await axios.get(`https://api.mfapi.in/mf/${schemeCode}/latest`);

    if (data?.status === "SUCCESS" && data.data?.[0]) {
      return {
        nav: parseFloat(data.data[0].nav),
        date: data.data[0].date,
        scheme_code: data.meta.scheme_code,
        isin: data.meta.isin_growth,
      };
    }

    return null;
  } catch (error) {
    console.error(`error while calling MF API (latest)  ${schemeCode}:`, error.message);
    addToBlacklist(`error while calling MF API (latest)  ${schemeCode}:`, error.message);
    return null;
  }
}
