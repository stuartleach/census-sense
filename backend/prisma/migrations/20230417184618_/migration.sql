/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "census_data" (
    "id" SERIAL NOT NULL,
    "zipcode" INTEGER,
    "population" INTEGER,
    "income" INTEGER,
    "age" INTEGER,
    "average_home_value" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "census_data_zipcode_key" ON "census_data"("zipcode");
