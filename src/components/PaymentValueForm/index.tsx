"use client";

import { redirect } from "next/navigation";
import Button from "../Button";
import InputField from "../InputField";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PaymentValueForm() {
  const router = useRouter();

  const t_fl = useTranslations("FormsLabels")
  const t_cta = useTranslations("CTA");

  function formSubmit(formValues: { value: string }) {
    router.push("/payments/new");
  }

  return (
    <Formik initialValues={{ value: "0" }} onSubmit={formSubmit}>
      <Form className="flex flex-col gap-4">
        <InputField
          label={t_fl("ammountPayable")}
          value={"R$ 30900,00"}
          name="value"
          disabled
          className="max-w-[10em] mx-auto"
        />
        <Button type="submit" className="mx-auto">
          {t_cta("pay")}
        </Button>
      </Form>
    </Formik>
  );
}
