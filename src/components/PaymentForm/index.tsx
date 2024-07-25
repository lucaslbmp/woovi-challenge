"use client";

import { InstallmentOption, PaymentMethod } from "@/types";
import InputField from "../InputField";
import { formatToReais } from "@/utils/functions.ts";
import Button from "../Button";
import { sendPaymentData } from "@/actions";
import { ChangeEvent, useEffect, useState } from "react";
import { requestPayment, requestPaymentOptions } from "@/services";
import { usePaymentContext } from "@/contexts/global-context";
import useSWR from "swr";
import { generateInstallments } from "@/utils/functions.ts";
import { generateInstallmentOptions } from "@/utils/functions.ts";
import { Formik, FormikProps, FormikValues } from "formik";
import PaymentFormSchema from "./schema";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInputComponent from "../InputComponents/MaskedInput";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useSWRFetch } from "@/utils/fetch";

type PaymentFormProps = {};

type PaymentFormikProps = {
  name: string;
  cpf: string;
  cardNumber: string;
  cardExpiration: string;
  cardCode: string;
  installmentsOption: string;
};

export default function PaymentForm() {
  const t = useTranslations("FormsLabels");
  const t_cta = useTranslations("CTA");
  const t_common = useTranslations("Common");
  const {paymentId} = useParams<{paymentId: string}>();

  const { payment: newPayment, setPayment: setNewPayment } =
    usePaymentContext();
  const [selectedOption, setSelectedOption] = useState(1);
  const [installmenOptions, setInstallmentOptions] =
    useState<InstallmentOption[]>();

  function getInstallmentOption(value: string) {
    return installmenOptions?.find(
      (inst) => inst.numberOfInstallments === Number(value)
    );
  }

  function updateSelectedOption(value: string) {
    const _option = getInstallmentOption(value);
    if (!_option || !_option.numberOfInstallments) return;
    setSelectedOption(_option.numberOfInstallments);
    return _option;
  }

  function handlePaymentMethodChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!payment) return;

    const _option = updateSelectedOption(e.target.value);
    if (!_option) return;

    // Generating installments according to the newly selected installment option
    const _newInstallments = generateInstallments(_option, payment);

    // Updating payment state with data from the newly selected installment option
    setNewPayment({
      ...payment,
      installments: _newInstallments,
      downpayment:
        payment.downpaymentStatus === "done"
          ? payment.downpayment
          : _option.installmentValue,
    });
  }

  function handleSubmit(values: FormikValues) {}

  // Requesting payment data from backend
  const {
    data: payment,
    error,
    isLoading,
  } = useSWRFetch(requestPayment, "111", paymentId);

  // Requesting payment options
  const {
    data: paymentOptions,
    error: errorOptions,
    isLoading: isLoadingOptions,
  } = useSWRFetch(requestPaymentOptions);

  // Updating page for initial payment data
  useEffect(() => {
    if (payment) {
      if(!paymentOptions) return;
      const _installments = generateInstallmentOptions(payment, paymentOptions);
      setInstallmentOptions(_installments);
      setSelectedOption(payment?.installments?.length ?? 1);
      setNewPayment(payment);
    }
  }, [payment, paymentOptions]);

  useEffect(() => {
    console.log(isLoading, payment, Object.keys(payment ?? {}).length);
    if (!isLoading && payment && Object.keys(payment).length === 0)
      redirect("/");
  }, [isLoading]);

  return (
    <Formik
      initialValues={{
        name: "",
        cpf: "",
        cardNumber: "",
        cardExpiration: "",
        cardCode: "",
        installmentsOption: "",
      }}
      validationSchema={PaymentFormSchema}
      onSubmit={handleSubmit}
    >
      {(formik: FormikProps<PaymentFormikProps>) => (
        <form action={sendPaymentData} className="flex flex-wrap gap-7">
          <InputField
            name="name"
            label={t("completeName")}
            placeholder={t("completeName")}
            className="flex-grow basis-[26rem]"
          />
          <InputField
            name="cpf"
            autoComplete="off"
            mask={[
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            component={MaskedInputComponent}
            label={t("ssn")}
            placeholder="XXX.XXX.XXX-XX"
            className="flex-grow basis-[16rem]"
          />
          <InputField
            name="cardNumber"
            label={t("cardNumber")}
            placeholder="0000 0000 0000 0000"
            className="flex-grow basis-[16em]"
          />
          <InputField
            name="cardExpiration"
            component={MaskedInputComponent}
            label={t("expirationDate")}
            mask={[/\d/, /\d/, "/", /\d/, /\d/]}
            guide={false}
            placeholder="mm/aa"
            className="flex-grow basis-[8em]"
          />
          <InputField
            name="cardCode"
            label={t("cvv")}
            maxLength={3}
            placeholder="XXX"
            className="flex-grow basis-[8em]"
          />
          <InputField
            as="select"
            name="installments-option"
            label={t("installments")}
            className="flex-grow basis-[16em]"
            value={selectedOption}
            onChange={handlePaymentMethodChange}
          >
            {installmenOptions?.map((inst, i) => (
              <option key={i} value={inst.numberOfInstallments}>
                {`${inst.numberOfInstallments}x ${t_common(
                  "of"
                )} ${formatToReais(inst.installmentValue)}`}
              </option>
            ))}
          </InputField>
          <div className="flex basis-full justify-center">
            <Button
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
              className="w-full max-w-[27rem]"
            >
              {t_cta("pay")}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
