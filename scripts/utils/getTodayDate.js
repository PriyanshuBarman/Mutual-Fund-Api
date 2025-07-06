export function getTodayDate() {
  const todayIST = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
  return new Date(todayIST);
}
