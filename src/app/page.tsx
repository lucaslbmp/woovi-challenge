import OptionCard from "@/components/OptionCard";
import OptionCardsColumn from "@/components/OptionCardsColumn";
import { paymentOptions } from "../../node-api/data";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import {  paymentChoiceAction } from "@/actions";
import { usePaymentContext } from "@/contexts/global-context";
import { getPayment } from "@/services";

export default async function PaymentPage() {

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">
      <PageTitle text={"João, como você quer pagar?"} />

      <form className="flex flex-col gap-8" action={paymentChoiceAction}>
        <OptionCard {...paymentOptions[0]} title={"Pix"}/>
        <OptionCardsColumn
          options={paymentOptions?.slice(1)}
          title="Pix Parcelado"
        />
        <Button className="w-[50%] max-w-[16rem] mx-auto" type="submit">
          Avançar
        </Button>
      </form>
    </main>
  );
}
