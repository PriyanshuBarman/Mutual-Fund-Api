/*
  Warnings:

  - You are about to alter the column `expense_ratio` on the `mutual_fund` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `mutual_fund` MODIFY `expense_ratio` DOUBLE NULL;
