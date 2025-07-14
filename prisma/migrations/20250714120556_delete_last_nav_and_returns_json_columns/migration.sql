/*
  Warnings:

  - You are about to drop the column `last_nav` on the `mutual_fund` table. All the data in the column will be lost.
  - You are about to drop the column `returns` on the `mutual_fund` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mutual_fund` DROP COLUMN `last_nav`,
    DROP COLUMN `returns`;
