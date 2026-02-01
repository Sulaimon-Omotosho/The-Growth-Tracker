/*
  Warnings:

  - You are about to drop the column `departmentIds` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[leaderId]` on the table `Cell` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaderId]` on the table `ChurchTeam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaderId]` on the table `Community` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaderId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaderId]` on the table `District` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaderId]` on the table `Zone` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "departmentIds",
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cell_leaderId_key" ON "Cell"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchTeam_leaderId_key" ON "ChurchTeam"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Community_leaderId_key" ON "Community"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_leaderId_key" ON "Department"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "District_leaderId_key" ON "District"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_leaderId_key" ON "Zone"("leaderId");

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchTeam" ADD CONSTRAINT "ChurchTeam_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
