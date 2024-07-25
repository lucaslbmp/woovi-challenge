"use client";

import { paymentChoiceAction } from "@/actions";
import Button from "../Button";
import OptionCard from "../OptionCard";
import OptionCardsColumn from "../OptionCardsColumn";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { generateToast } from "../Toast/toastMsg";
import { redirect, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { requestPayment, requestPaymentOptions } from "@/services";
import { useSWRFetch } from "@/utils/fetch";

export default function PaymentOptionForm() {
  const t_cta = useTranslations("CTA");
  const [formState, formAction] = useFormState(paymentChoiceAction, {
    status: "pending",
    message: "",
  });
  const {paymentId} = useParams();

  const { data: paymentOptions, error, isLoading } = useSWRFetch(requestPaymentOptions)

  useEffect(() => {
    generateToast(formState);
    if (formState.status === "success"){
      const _paymentData = formState?.state ? JSON.parse(formState.state) : undefined
      if(_paymentData?.id)
      redirect(`/payments/${_paymentData.id}/downpayment`);
    }
  }, [formState]);

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
