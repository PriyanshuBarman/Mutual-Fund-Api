import db from "../../config/db.js";

export async function updateFundData(fundId, mappedData) {
  try {
    await db.mutual_fund.update({
      where: { id: fundId },
      data: { ...mappedData },
    });
  } catch (error) {
    throw new Error(`Database update failed: ${error.message}`);
  }
}
