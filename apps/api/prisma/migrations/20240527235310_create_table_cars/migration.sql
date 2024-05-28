-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "original_value" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);
