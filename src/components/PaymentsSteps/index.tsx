"use client";

import { StepsProgressBar } from "../StepsProgressBar";
import { useState } from "react";
import { usePaymentContext } from "@/contexts/global-context";
import { redirect } from "next/navigation";
import HRule from "../HRule";
import { buildPaymentSteps, formatToReais } from "@/utils/functions";

export default function PaymentSteps() {
  const {payment, setPayment} = usePaymentContext();
  //if(!payment) redirect("/");
  const steps = (buildPaymentSteps(payment)) ?? [];

  return (
    <>
    {steps && <StepsProgressBar steps={steps} />}
    
    <HRule />

      <div className="flex">
        <span>CET: 0,5%</span>
        <span className="text-right flex-1">
          Total: {formatToReais(payment?.total ?? "-")}
        </span>
      </div>
    </>
  
);
}
