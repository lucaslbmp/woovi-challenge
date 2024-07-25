import HRule from "@/components/HRule";
import PaymentsSteps from "@/components/PaymentsSteps";
import { getTranslations } from "next-intl/server";

type PaymentDetailsPageProps = {
  children: React.ReactNode;
};

export default async function PaymentDetailsPage({
  children,
}: PaymentDetailsPageProps) {


  const t = await getTranslations("Screens.PaymentScreen.Common")

  return (
    <main className="font-nunito flex flex-col gap-8 m-4">

      {children}

      <PaymentsSteps />

      <HRule />

      <div className="mx-auto text-center">
        <div className="text-textSecondary">{t("identifier")}:</div>
        <div className="font-nunitoBold">2c1b951f356c4680b13ba1c9fc889c47</div>
      </div>

      <HRule />

      <div className="font-nunitoBold">{t("howDoesItWork")}</div>

      <HRule />

    </main>
  );
}
