import db from "../../config/db.js";
import { getTodayDate } from "../utils/getTodayDate.js";
import { parseDDMMYYYY } from "../utils/parseDDMMYYYY.js";

const today = getTodayDate();

// stores nav date in YYYY-MM-DD format
export const updateNavAndReturns = async (id, navData, returnsObject, dayChangePercent) => {
  const latestNav = navData[0].nav;
  const navDate = new Date(parseDDMMYYYY(navData[0].date)); // convert nav date in YYYY-MM-DD format

  try {
    await db.mutual_fund.update({
      where: { id },
      data: {
        ...returnsObject,
        day_change_percent: dayChangePercent,
        nav: { nav: latestNav, date: navDate },
        last_updated: today,
      },
    });
  } catch (error) {
    throw new Error(`Error At updateNavAndReturns: ${error.message}`);
  }
};
