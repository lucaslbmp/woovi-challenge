import QRCodeInterface from "@/components/QRCodeInterface";
import { redirect, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { formatToReais } from "@/utils/functions";
import { getTranslations } from "next-intl/server";
import { requestPayment } from "@/services";

type SectionProps = {
  params:{
    paymentId: string;
  }
}

export default async function DownPaymentSection({
  params
}: SectionProps) {
  const t = await getTranslations("Screens.PaymentScreen.Downpayment");
  const {paymentId} = params;

  const payment = await requestPayment("111", paymentId);
  if(!payment)  redirect("/");
  if(!(Object.keys(payment).length)) redirect("/");

  return (
    <>
      <PageTitle
        // text={`João, pague a entrada de ${formatToReais(
        //   currPaymentMethod?.installmentValue
        // )} pelo Pix`}
        text={
          t("title", {
          user: "João",
          value: formatToReais(payment?.downpayment ?? 0),
        })
      }
      />
      <QRCodeInterface paymentId={paymentId}/>
    </>
  );
}

