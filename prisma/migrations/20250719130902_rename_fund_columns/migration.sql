-- This is an empty migration.
ALTER TABLE `mutual_fund` RENAME COLUMN `fund_name` TO `amc_name`;
ALTER TABLE `mutual_fund` RENAME COLUMN `fund_house` TO `amc_code`;