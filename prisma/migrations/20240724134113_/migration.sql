-- DropForeignKey
ALTER TABLE "Installment" DROP CONSTRAINT "Installment_paymentId_fkey";

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
