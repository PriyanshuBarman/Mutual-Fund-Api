-- DropIndex
DROP INDEX `mutual_fund_name_short_name_idx` ON `mutual_fund`;

-- CreateIndex
CREATE FULLTEXT INDEX `mutual_fund_name_short_name_fund_category_fund_name_idx` ON `mutual_fund`(`name`, `short_name`, `fund_category`, `fund_name`);
