-- CreateIndex
CREATE INDEX `mutual_fund_scheme_code_idx` ON `mutual_fund`(`scheme_code`);

-- CreateIndex
CREATE INDEX `mutual_fund_code_idx` ON `mutual_fund`(`code`);

-- CreateIndex
CREATE INDEX `mutual_fund_ISIN_idx` ON `mutual_fund`(`ISIN`);
