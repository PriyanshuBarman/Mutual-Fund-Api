import axios from "axios";

export async function fetchMFApiNAV(schemeCode) {
  try {
    const { data } = await axios.get(
      `${process.env.MF_API_BASE_URL}/${schemeCode}`
    );
    return {
      nav: parseFloat(data.data[0].nav),
      date: data.data[0].date,
    };
  } catch (error) {
    throw new Error(
      `Error at fetchMFApiNAV for scheme ${schemeCode}: ${error.message}`
    );
  }
}
