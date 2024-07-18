import { paymentOptions } from "../../api/data";
import QRCodeInterface from "@/components/QRCodeInterface";
import { redirect } from "next/navigation";
import { getCurrentPaymentMethod } from "@/actions";
import PageTitle from "@/components/PageTitle";
import { formatToReais } from "@/utils/functions";
import { getTranslations } from "next-intl/server";

export default async function DownPaymentSection() {
  const t = await getTranslations("Screens.PaymentScreen.Downpayment");

  const currPaymentMethod = await getCurrentPaymentMethod(paymentOptions);
  if (!currPaymentMethod) redirect("/");

  return (
    <>
      <PageTitle
        // text={`João, pague a entrada de ${formatToReais(
        //   currPaymentMethod?.installmentValue
        // )} pelo Pix`}
        text={
          t("title", {
          user: "João",
          value: formatToReais(currPaymentMethod?.installmentValue),
        })
      }
      />
      <QRCodeInterface currPaymentMethod={currPaymentMethod} />
    </>
  );
}
function getTranslator(arg0: any, arg1: string) {
  throw new Error("Function not implemented.");
}

