import db from "../../config/db.js";

export async function updateFundData(fundId, mappedData, failedCount) {
  try {
    await db.mutual_fund.update({
      where: { id: fundId },
      data: { ...mappedData },
    });
  } catch (error) {
    failedCount++;
    console.error("Database update failed:", error.message);
    throw new Error(`Database update failed: ${error.message}`);
  }
}
