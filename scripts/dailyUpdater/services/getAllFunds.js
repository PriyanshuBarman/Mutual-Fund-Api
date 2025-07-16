import db from "../../config/db.js";
import { getTodayDate } from "../utils/getTodayDate.js";

const today = getTodayDate();

export const getAllFunds = async () => {
  try {
    return await db.mutual_fund.findMany({
      select: {
        id: true,
        scheme_code: true,
        nav: true,
      },
      where: {
        OR: [{ last_updated: { lt: today } }, { last_updated: null }],
      },
    });
  } catch (error) {
    throw new Error(`Error At getAllFunds: ${error.message}`);
  }
};
