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
import useSWR from "swr";
import { requestPayment, requestPaymentOptions } from "@/services";
import { useSWRFetch } from "@/utils/fetch";

export default function PaymentOptionForm() {
  const t_cta = useTranslations("CTA");
  const [state, formAction] = useFormState(paymentChoiceAction, {
    status: "pending",
    message: "",
  });


  const { data, error, isLoading } = useSWRFetch(requestPaymentOptions)

  useEffect(() => {
    console.log(data);
  }, [data])

  useEffect(() => {
    generateToast(state);
    if (state.status === "success")
      redirect("/pix-and-credit-card/downpayment");
  }, [state]);

  return (
    <form className="flex flex-col gap-8" action={formAction}>
      {paymentOptions &&
      <>
       <OptionCard {...paymentOptions[0]} title={"Pix"} />
      <OptionCardsColumn
        options={paymentOptions?.slice(1)}
        title="Pix Parcelado"
      />
      <Button className="w-[50%] max-w-[16rem] mx-auto" type="submit">
        {t_cta("next")}
      </Button>
      </>
     
}
    </form>
  );
}
