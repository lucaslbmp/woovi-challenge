import { paymentOptions } from "@/app/data";
import { formatToReais } from "@/app/utils/functions";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { cookies } from "next/headers";
import { StepsProgressBar } from "@/components/StepsProgressBar";
import HRule from "@/components/HRule";
import QRCodeInterface from "@/components/QRCodeInterface";

export default async function PaymentDetailsPage() {
  function getCurrentPaymentMethod() {
    const cookieStore = cookies();
    const paymentMethodName = cookieStore.get("paymentMethod")?.value;
    return paymentOptions.find((opt) => opt.value === paymentMethodName);
  }

  function getPaymentSteps(paymentMethod: any) {
    if (!paymentMethod.numberOfInstallments) return undefined;
    const steps = [
      {
        description: "1ª entrada no PIX",
        value: formatToReais(paymentMethod.installmentValue),
        completed: false,
        selected: true,
      },
    ];
    for (var i = 1; i < paymentMethod.numberOfInstallments; i++) {
      steps.push({
        description: i + 1 + "ª no cartão",
        value: formatToReais(paymentMethod.installmentValue),
        completed: false,
        selected: false,
      });
    }
    return steps;
  }

  const currPaymentMethod = getCurrentPaymentMethod();
  const steps = getPaymentSteps(currPaymentMethod) ?? [];

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">
      <Logo />

        {currPaymentMethod && <QRCodeInterface currPaymentMethod={currPaymentMethod}/>}
      
      <StepsProgressBar steps={steps} />

      <HRule />

      <div className="flex">
        <span>CET: 0,5%</span>
        <span className="text-right flex-1">Total: {formatToReais(currPaymentMethod?.total ?? "-")}</span>
      </div>

      <HRule />

      <div className="mx-auto text-center">
        <div className="text-textSecondary">Identificador:</div>
        <div className="font-nunitoBold">2c1b951f356c4680b13ba1c9fc889c47</div>
      </div>

      <HRule />

      <div className="font-nunitoBold">Como funciona?</div>

      <Footer />
    </main>
  );
}
