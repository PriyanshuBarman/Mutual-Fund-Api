import axios from "axios";

export async function searchFund(query) {
  try {
    const { data } = await axios.get(`${process.env.SEARCH_API}${encodeURIComponent(query)}`);
    return data?.data?.funds || [];
  } catch (error) {
    console.error(`SearchApi error:`, error.message);
    return [];
  }
}
