import OptionCard from "@/components/OptionCard";
import OptionCardsColumn from "@/components/OptionCardsColumn";
import { paymentOptions } from "./api/data";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import {  paymentChoiceAction } from "@/actions";
import { usePaymentContext } from "@/contexts/global-context";
import { getPayment } from "@/services";
import PaymentOptionForm from "@/components/PaymentOptionForm";

export default async function PaymentPage() {

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">
      <PageTitle text={"João, como você quer pagar?"} />
      <PaymentOptionForm />
    </main>
  );
}
