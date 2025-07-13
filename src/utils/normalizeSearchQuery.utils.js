export const normalizeSearchQuery = (query) => {
  return query
    .toLowerCase()
    .replace(/largecap/g, "large cap")
    .replace(/smallcap/g, "small cap")
    .replace(/midcap/g, "mid cap")
    .replace(/multicap/g, "multi cap")
    .replace(/flexicap/g, "flexi cap")
    .replace(/\s+/g, " ")
    .trim();
};
