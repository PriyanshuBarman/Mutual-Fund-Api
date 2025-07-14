-- AlterTable
ALTER TABLE `mutual_fund` ADD COLUMN `return_1m` DOUBLE NULL,
    ADD COLUMN `return_1y` DOUBLE NULL,
    ADD COLUMN `return_3y` DOUBLE NULL,
    ADD COLUMN `return_5y` DOUBLE NULL,
    ADD COLUMN `return_6m` DOUBLE NULL,
    ADD COLUMN `return_since_inception` DOUBLE NULL;
