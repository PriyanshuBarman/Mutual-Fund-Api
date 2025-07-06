/*
  Warnings:

  - You are about to drop the column `nav_updated_at` on the `mutual_fund` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `mutual_fund_nav_updated_at_idx` ON `mutual_fund`;

-- AlterTable
ALTER TABLE `mutual_fund` DROP COLUMN `nav_updated_at`,
    ADD COLUMN `updated_at` DATE NULL;

-- CreateIndex
CREATE INDEX `mutual_fund_updated_at_idx` ON `mutual_fund`(`updated_at`);
