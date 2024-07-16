"use client";

import { StepsProgressBar } from "../StepsProgressBar";
import { use, useEffect, useState } from "react";
import { usePaymentContext } from "@/contexts/global-context";
import { redirect } from "next/navigation";
import HRule from "../HRule";
import { buildPaymentSteps, formatToReais } from "@/utils/functions.ts";
import { requestPayment } from "@/services";
import useSWR from "swr";
import { Step } from "@/types";

export default function PaymentSteps() {
  const { payment, setPayment } = usePaymentContext();
  //if(!payment) redirect("/");
  const [steps, setSteps] = useState<Step[]>();

  const fetcher = ([userId, id]: [string, string]) =>
    requestPayment(userId, id);
  const { data: dbPayment, error, isLoading } = useSWR(["111", "999"], fetcher);

  useEffect(() => {
    setPayment(dbPayment);
  }, [dbPayment]);

  useEffect(() => {
    setSteps(buildPaymentSteps(payment) ?? []);
  }, [payment]);

  return (
    <>
      {steps && <StepsProgressBar steps={steps} />}

      <HRule />

      <div className="flex">
        <span>CET: 0,5%</span>
        <span className="text-right flex-1">
          Total: {formatToReais(payment?.total ?? 0)}
        </span>
      </div>
    </>
  );
}
