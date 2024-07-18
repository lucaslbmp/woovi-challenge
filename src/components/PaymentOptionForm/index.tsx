"use client";

import { paymentChoiceAction } from "@/actions";
import Button from "../Button";
import OptionCard from "../OptionCard";
import OptionCardsColumn from "../OptionCardsColumn";
import { paymentOptions } from "@/app/api/data";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { generateToast } from "../Toast/toastMsg";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PaymentOptionForm() {
  const t_cta = useTranslations("CTA");
  const [state, formAction] = useFormState(paymentChoiceAction, {
    status: "pending",
    message: "",
  });

  useEffect(() => {
    generateToast(state);
    if (state.status === "success")
      redirect("/pix-and-credit-card/downpayment");
  }, [state]);

  return (
    <form className="flex flex-col gap-8" action={formAction}>
      <OptionCard {...paymentOptions[0]} title={"Pix"} />
      <OptionCardsColumn
        options={paymentOptions?.slice(1)}
        title="Pix Parcelado"
      />
      <Button className="w-[50%] max-w-[16rem] mx-auto" type="submit">
        {t_cta("next")}
      </Button>
    </form>
  );
}
