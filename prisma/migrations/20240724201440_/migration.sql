-- AlterTable
ALTER TABLE "PaymentOption" ALTER COLUMN "highlighted" DROP NOT NULL,
ALTER COLUMN "tip_highlight" DROP NOT NULL,
ALTER COLUMN "tip_text" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL;