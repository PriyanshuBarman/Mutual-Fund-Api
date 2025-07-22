/*
  Warnings:

  - You are about to alter the column `expense_ratio` on the `mutual_fund` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(4,2)`.

*/
-- AlterTable
ALTER TABLE `mutual_fund` MODIFY `expense_ratio` DECIMAL(4, 2) NULL;
