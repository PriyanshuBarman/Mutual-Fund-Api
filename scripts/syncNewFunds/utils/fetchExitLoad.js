import axios from "axios";

export const fetchExitLoad = async (code) => {
  const { data } = await axios.get(`${process.env.EXIT_LOAD_API}${code}.json`);
  return data[0].exit_load[0] || null;
};
