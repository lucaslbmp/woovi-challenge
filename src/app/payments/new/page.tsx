import PageTitle from "@/components/PageTitle";
import PaymentOptionForm from "@/components/PaymentOptionForm";
import { getTranslations } from "next-intl/server";

export default async function PaymentOptionsPage() {
    const t = await getTranslations("Screens.PaymentMethodScreen")
  
    return (
      <main className="font-nunito flex flex-col gap-8 m-4">
        <PageTitle text={t("title")} />
        <PaymentOptionForm />
      </main>
    );
  }
  