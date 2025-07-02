import { getFilteredDirectFunds } from "./utils/helper.js";
import { enrichAndInsert } from "./services/enrichAndInsert.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const run = async (req, res) => {
  try {
    const filteredFunds = await getFilteredDirectFunds();
    await enrichAndInsert(filteredFunds);
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
};

run();
