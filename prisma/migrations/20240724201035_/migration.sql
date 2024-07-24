-- CreateTable
CREATE TABLE "PaymentOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "numberOfInstallments" INTEGER NOT NULL,
    "installmentValue" DOUBLE PRECISION NOT NULL,
    "highlighted" TEXT NOT NULL,
    "tip_highlight" TEXT NOT NULL,
    "tip_text" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PaymentOption_pkey" PRIMARY KEY ("id")
);
