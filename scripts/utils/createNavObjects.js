export function createNavObjects(navData) {
  const latest_nav = navData[0].nav;
  const previous_nav = navData[1].nav;

  const navObject = {
    nav: latest_nav,
    date: navData[0].date,
  };

  const lastNavObject = {
    nav: previous_nav,
    date: navData[1].date,
  };

  return { navObject, lastNavObject };
}
