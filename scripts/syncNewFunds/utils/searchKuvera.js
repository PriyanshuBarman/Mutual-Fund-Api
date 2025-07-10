import axios from "axios";

export async function searchKuvera(query) {
  try {
    const { data } = await axios.get(`${process.env.SEARCH_API}${encodeURIComponent(query)}`);
    // console.log(data?.data?.funds);
    return data?.data?.funds || [];
  } catch (error) {
    console.error(`Kuvera search error:`, error.message);
    return [];
  }
}
