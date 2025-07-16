import db from "../../config/db.js";
import { getTodayDate } from "../utils/getTodayDate.js";

const today = getTodayDate();

export const updateNavAndReturns = async (id, navData, returnsObject) => {
  try {
    await db.mutual_fund.update({
      where: { id },
      data: {
        nav: { nav: navData[0].nav, date: navData[0].date },
        ...returnsObject,
        last_updated: today,
      },
    });
  } catch (error) {
    throw new Error(`Error At updateNavAndReturns: ${error.message}`);
  }
};
