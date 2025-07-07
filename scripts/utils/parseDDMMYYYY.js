export function parseDDMMYYYY(dateStr) {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split("-");

  return new Date(`${year}-${month}-${day}`);
}
