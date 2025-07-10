-- CreateTable
CREATE TABLE `blacklisted_fund` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheme_code` INTEGER NOT NULL,
    `scheme_name` VARCHAR(191) NOT NULL,
    `isin` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blacklisted_fund_scheme_code_key`(`scheme_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
