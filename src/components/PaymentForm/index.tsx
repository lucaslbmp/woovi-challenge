"use client";

import {
  Installment,
  InstallmentOption,
  Payment,
  PaymentMethod,
} from "@/types";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { paymentOptions } from "../../app/api/data";
import { formatToReais } from "@/utils/functions.ts";
import Button from "../Button";
import { sendPaymentData, setCurrentPaymentMethod } from "@/actions";
import { ChangeEvent, use, useCallback, useEffect, useState } from "react";
import { createPayment, requestPayment } from "@/services";
import { usePaymentContext } from "@/contexts/global-context";
import useSWR from "swr";
import { storePayment } from "@/cookiesActions";
import { generateInstallments } from "@/utils/functions.ts";
import { generateInstallmentOptions } from "@/utils/functions.ts";
import { Formik, FormikProps } from "formik";
import PaymentFormSchema from "./schema";
// import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInputComponent from "../InputComponents/MaskedInput";
import DatePickerComponent from "../InputComponents/DatePicker";

type PaymentFormProps = {
  paymentMethod: PaymentMethod;
};

type PaymentFormikProps = {
  name: string;
  cpf: string;
  cardNumber: string;
  cardExpiration: string;
  cardCode: string;
  installmentsOption: string;
};

export default function PaymentForm({ paymentMethod }: PaymentFormProps) {
  // const selectedMethod = paymentOptions.find(
  //   (method) => method.value === paymentMethod.value
  // );
  //const [newPayment, setNewPayment] = useState<Payment>();
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

  // Requesting payment data from backend
  const fetcher = ([userId, id]: [string, string]) =>
    requestPayment(userId, id);
  const { data: payment, error, isLoading } = useSWR(["111", "999"], fetcher);
  //setNewPayment(data);

  // Updating page for initial payment data
  useEffect(() => {
    if (payment) {
      const _installments = generateInstallmentOptions(payment, paymentOptions);
      console.log(_installments);
      setInstallmentOptions(_installments);
      setSelectedOption(payment.installments.length);
      setNewPayment(payment);
    }
  }, [payment]);

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
      onSubmit={() => {}}
    >
      {(props: FormikProps<PaymentFormikProps>) => (
        <form action={sendPaymentData} className="flex flex-wrap gap-7">
          <InputField
            name="name"
            label="Nome completo"
            placeholder="Nome completo"
            className="flex-grow basis-[26rem]"
          />
          <InputField
            name="cpf"
            //mask="999.999.999-99"
            mask={[
              /\d/, /\d/, /\d/, '.',
              /\d/, /\d/, /\d/, '.',
              /\d/, /\d/, /\d/, '-',
              /\d/, /\d/
            ]}
            component={MaskedInputComponent}
            label="CPF"
            placeholder="XXX.XXX.XXX-XX"
            className="flex-grow basis-[16rem]"
          />
          <InputField
            name="cardNumber"
            label="Número do cartão"
            placeholder="Número do cartão"
            className="flex-grow basis-[16em]"
          />
          <InputField
            name="cardExpiration"
            component={MaskedInputComponent}
            label="Vencimento"
            mask={[/\d/, /\d/, '/',/\d/, /\d/]}
            guide={false}
            placeholder="mm/aa"
            className="flex-grow basis-[8em]"
          />
          <InputField
            name="cardCode"
            label="CVV"
            maxLength={3}
            placeholder="XXX"
            className="flex-grow basis-[8em]"
          />
          <InputField
            as="select"
            name="installments-option"
            label="Parcelas"
            className="flex-grow basis-[16em]"
            value={selectedOption}
            onChange={handlePaymentMethodChange}
          >
            {installmenOptions?.map((inst, i) => (
              <option key={i} value={inst.numberOfInstallments}>
                {`${inst.numberOfInstallments}x de ${formatToReais(
                  inst.installmentValue
                )}`}
              </option>
            ))}
          </InputField>
          <div className="flex basis-full justify-center">
            <Button className="w-full max-w-[27rem]">Pagar</Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
