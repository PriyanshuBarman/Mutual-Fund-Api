import db from "../../config/db.js";
import { getTodayDate } from "../utils/getTodayDate.js";
import { parseDDMMYYYY } from "../utils/parseDDMMYYYY.js";

const today = getTodayDate();

// stores nav date in YYYY-MM-DD format
export const updateNavAndReturns = async (id, navData, returnsObject) => {
  try {
    await db.mutual_fund.update({
      where: { id },
      data: {
        nav: { nav: navData[0].nav, date: new Date(parseDDMMYYYY(navData[0].date)) },
        ...returnsObject,
        last_updated: today,
      },
    });
  } catch (error) {
    throw new Error(`Error At updateNavAndReturns: ${error.message}`);
  }
};
