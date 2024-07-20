import {  paymentOptions } from "../../api/data";
import QRCodeInterface from "@/components/QRCodeInterface";
import { redirect } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { formatToReais } from "@/utils/functions";
import { getTranslations } from "next-intl/server";
import { requestPayment } from "@/services";

export default async function DownPaymentSection() {
  const t = await getTranslations("Screens.PaymentScreen.Downpayment");

  // const currPaymentMethod = await getCurrentPaymentMethod(paymentOptions);
  // if (!currPaymentMethod) redirect("/");
  const payment = await requestPayment("111","999");

  return (
    <>
      <PageTitle
        // text={`João, pague a entrada de ${formatToReais(
        //   currPaymentMethod?.installmentValue
        // )} pelo Pix`}
        text={
          t("title", {
          user: "João",
          value: formatToReais(payment.downpayment),
        })
      }
      />
      <QRCodeInterface />
    </>
  );
}

