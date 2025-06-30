-- CreateTable
CREATE TABLE `mutual_fund` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schemeCode` INTEGER NOT NULL,
    `schemeName` VARCHAR(191) NOT NULL,
    `isin` VARCHAR(191) NOT NULL,
    `kuveraCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `mutual_fund_schemeCode_key`(`schemeCode`),
    UNIQUE INDEX `mutual_fund_isin_key`(`isin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
