/*
  Warnings:

  - Added the required column `Qualifications` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "Qualifications" TEXT NOT NULL;
