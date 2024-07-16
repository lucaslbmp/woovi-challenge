import { buildPaymentSteps, formatToReais } from "@/utils/functions";
import { StepsProgressBar } from "@/components/StepsProgressBar";
import HRule from "@/components/HRule";
import { redirect } from "next/navigation";
import { requestPayment } from "@/services";
import PaymentsSteps from "@/components/PaymentsSteps";

type PaymentDetailsPageProps = {
  children: React.ReactNode;
};

export default async function PaymentDetailsPage({
  children,
}: PaymentDetailsPageProps) {


  //const currPaymentMethod = await getCurrentPaymentMethod(paymentOptions);
  // const fetcher = ([userId, id] : [string, string]) => getPayment(userId, id)
  // const {data: payment, error, isLoading} = useSWR(["111","999"], fetcher)

  //const payment = await requestPayment("111", "999")
  
  //const payment = await retrievePayment();

  
  //if (!payment) redirect("/");
  // const steps = await getPaymentSteps();
  //const steps =  buildPaymentSteps(payment) ?? [];

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">

      {children}

      {/* <StepsProgressBar steps={steps} /> */}
      
      <PaymentsSteps />

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
