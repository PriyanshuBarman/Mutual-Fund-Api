/*
  Warnings:

  - You are about to drop the column `updated_at` on the `mutual_fund` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `mutual_fund_updated_at_idx` ON `mutual_fund`;

-- AlterTable
ALTER TABLE `mutual_fund` DROP COLUMN `updated_at`,
    ADD COLUMN `last_updated` DATE NULL;

-- CreateIndex
CREATE INDEX `mutual_fund_last_updated_idx` ON `mutual_fund`(`last_updated`);
