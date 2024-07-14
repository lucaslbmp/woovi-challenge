import { paymentOptions } from "../../../node-api/data";
import { formatToReais } from "@/utils/functions";
import { StepsProgressBar } from "@/components/StepsProgressBar";
import HRule from "@/components/HRule";
import { redirect } from "next/navigation";
import { buildPaymentSteps, getCurrentPaymentMethod } from "@/actions";
import { Payment, PaymentMethod, Step } from "@/types";
import { getPayment } from "@/services";
import { retrievePayment } from "@/cookiesActions";

type PaymentDetailsPageProps = {
  children: React.ReactNode;
};

export default async function PaymentDetailsPage({
  children,
}: PaymentDetailsPageProps) {


  //const currPaymentMethod = await getCurrentPaymentMethod(paymentOptions);
  const payment = await getPayment("111","999");
  //const payment = await retrievePayment();

  
  if (!payment) redirect("/");
  // const steps = await getPaymentSteps();
  const steps =  await buildPaymentSteps(payment) ?? [];

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">

      {children}

      <StepsProgressBar steps={steps} />

      <HRule />

      <div className="flex">
        <span>CET: 0,5%</span>
        <span className="text-right flex-1">
          Total: {formatToReais(payment?.total ?? "-")}
        </span>
      </div>

      <HRule />

      <div className="mx-auto text-center">
        <div className="text-textSecondary">Identificador:</div>
        <div className="font-nunitoBold">2c1b951f356c4680b13ba1c9fc889c47</div>
      </div>

      <HRule />

      <div className="font-nunitoBold">Como funciona?</div>

      <HRule />

    </main>
  );
}
