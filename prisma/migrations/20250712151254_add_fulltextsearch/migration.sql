-- CreateIndex
CREATE FULLTEXT INDEX `mutual_fund_name_short_name_idx` ON `mutual_fund`(`name`, `short_name`);
