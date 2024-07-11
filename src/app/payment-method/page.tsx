"use client";

import Logo from "@/components/Logo";
import OptionCard from "@/components/OptionCard";
import OptionCardsColumn from "@/components/OptionCardsColumn";
import { paymentOptions } from "@/app/data";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import { cookies } from "next/headers";
import { setSelectedPaymentMethod } from "@/actions";

export default function PaymentPage() {
  async function formAction(formData: FormData) {
    const payment = formData.get("payment") as string;
    setSelectedPaymentMethod(payment);
  }

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">
      <Logo />
      <PageTitle text={"João, como você quer pagar?"} />

      <form className="flex flex-col gap-8" action={formAction}>
        <OptionCard {...paymentOptions[0]} />
        <OptionCardsColumn
          options={paymentOptions?.slice(1)}
          title="Pix Parcelado"
        />
        <Button className="w-[50%] max-w-[16rem] mx-auto" type="submit">
          Avançar
        </Button>
      </form>
      <Footer />
    </main>
  );
}
