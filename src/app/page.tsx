"use server";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import PageTitle from "@/components/PageTitle";
import PaymentCard from "@/components/PaymentCard";
import PaymentOptionForm from "@/components/PaymentOptionForm";
import PaymentValueForm from "@/components/PaymentValueForm";
import { requestPayments } from "@/services";
import { Field, Form, Formik } from "formik";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
//import { redirect } from "next/navigation";

// export default async function PaymentPage() {
//   const t = await getTranslations("Screens.PaymentMethodScreen")

//   return (
//     <main className="font-nunito flex flex-col gap-8 m-4">
//       <PageTitle text={t("title")} />
//       <PaymentOptionForm />
//     </main>
//   );
// }

export default async function UserPaymentsPage() {
  //const payments = await requestPayments("111");

  return (
    <div className="font-nunito flex flex-col gap-8 m-4">
      <PageTitle text={"Novo pagamento"} />
      <PaymentValueForm />
      {/* <Link href={"payments/new"} className="max-w-[40em] mx-auto bg-secondary p-4 rounded-lg text-2xl">R$ 30900,00</Link> */}
      {/* <PageTitle text={"Meus pagamentos"} />
      {payments.map((p) => (
        <PaymentCard
          key={p.id}
          paymentId={p.id}
          numberOfInstallments={p.installments.length}
          installmentValue={p.installments?.at(0)?.value ?? 0}
          downpayment={p.downpayment}
        />
      ))} */}
    </div>
  );
}
