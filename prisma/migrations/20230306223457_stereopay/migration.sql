/*
  Warnings:

  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL;
