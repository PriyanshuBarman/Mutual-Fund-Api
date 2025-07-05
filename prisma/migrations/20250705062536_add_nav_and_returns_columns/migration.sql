-- AlterTable
ALTER TABLE `mutual_fund` ADD COLUMN `last_nav` JSON NULL,
    ADD COLUMN `nav` JSON NULL,
    ADD COLUMN `nav_updated_at` DATETIME(3) NULL,
    ADD COLUMN `returns` JSON NULL;

-- CreateIndex
CREATE INDEX `mutual_fund_nav_updated_at_idx` ON `mutual_fund`(`nav_updated_at`);
