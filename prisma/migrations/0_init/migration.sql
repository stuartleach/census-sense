-- CreateTable
CREATE TABLE "census_data" (
    "id" SERIAL NOT NULL,
    "zipcode" INTEGER,
    "population" INTEGER,
    "income" INTEGER,
    "age" INTEGER,
    "average_home_value" INTEGER,

    CONSTRAINT "census_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "census_data_zipcode_key" ON "census_data"("zipcode");

