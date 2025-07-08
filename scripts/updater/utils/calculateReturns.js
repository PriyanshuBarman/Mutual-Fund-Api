import { getNavNDaysAgo } from "./getNavNDaysAgo.js";
import { calculateCAGR } from "./calculateCAGR.js";
import { getTodayDate } from "./getTodayDate.js";

const today = getTodayDate();

export function calculateReturns(navData) {
  const latest_nav = navData[0].nav;

  // 1 Month
  const nav1mData = getNavNDaysAgo(navData, 31);
  const return_1m = nav1mData ? ((latest_nav - nav1mData.nav) / nav1mData.nav) * 100 : null;

  // 6 Months
  const nav6mData = getNavNDaysAgo(navData, 183);
  const return_6m = nav6mData ? ((latest_nav - nav6mData.nav) / nav6mData.nav) * 100 : null;

  // 1 Year
  const nav1yData = getNavNDaysAgo(navData, 366);
  const return_1y = nav1yData ? calculateCAGR(nav1yData.nav, latest_nav, 1) : null;

  // 3 Years
  const nav3yData = getNavNDaysAgo(navData, 366 * 3);
  const return_3y = nav3yData ? calculateCAGR(nav3yData.nav, latest_nav, 3) : null;

  // 5 Years
  const nav5yData = getNavNDaysAgo(navData, 366 * 5);
  const return_5y = nav5yData ? calculateCAGR(nav5yData.nav, latest_nav, 5) : null;

  // Since Inception
  const [day, month, year] = navData[navData.length - 1].date.split("-");
  const inceptionDate = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
  const yearsSinceInception = (new Date() - inceptionDate) / (1000 * 60 * 60 * 24 * 365.25);
  const nav_start = navData[navData.length - 1].nav;
  const return_inception = calculateCAGR(nav_start, latest_nav, yearsSinceInception);

  //  Return formatted returns object
  return {
    month_1: return_1m ? return_1m.toFixed(2) : null,
    month_6: return_6m ? return_6m.toFixed(2) : null,
    year_1: return_1y ? return_1y.toFixed(2) : null,
    year_3: return_3y ? return_3y.toFixed(2) : null,
    year_5: return_5y ? return_5y.toFixed(2) : null,
    inception: return_inception ? return_inception.toFixed(2) : null,
    date: today,
  };
}
