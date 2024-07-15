"use client";

import { Installment, Payment, PaymentMethod } from "@/types";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { paymentOptions } from "../../app/api/data";
import { formatToReais } from "@/utils/functions";
import Button from "../Button";
import { sendPaymentData, setCurrentPaymentMethod } from "@/actions";
import { ChangeEvent, use, useCallback, useEffect, useState } from "react";
import { createPayment, requestPayment } from "@/services";
import { usePaymentContext } from "@/contexts/global-context";
import useSWR from "swr";
import { storePayment } from "@/cookiesActions";
// import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";

type PaymentFormProps = {
  paymentMethod: PaymentMethod;
};

export default function PaymentForm({ paymentMethod }: PaymentFormProps) {
  // const selectedMethod = paymentOptions.find(
  //   (method) => method.value === paymentMethod.value
  // );
  const [newPayment, setNewPayment] = useState<Payment>();
  const [selectedOption, setSelectedOption] = useState(1);
  const [installmenOptions, setInstallmentOptions] = useState<Installment[]>();

  function generateInstallmentOptions(payment?: Payment) {
    if (!payment) return [];
    const list = [{ id: 1, value: payment.total, completed: false }];

    const totalInstallmentsValue = payment.total - payment.downpayment;

    for (var i = 1; i < paymentOptions.length - 1; i++) {
      list.push({
        id: i + 1,
        value: totalInstallmentsValue / (i + 1),
        completed: false,
      });
    }

    // const _numberOfInstallments = (payment.downpaymentStatus !== "done" && numberOfInstallments >= 1)
    // ? numberOfInstallments
    // : (numberOfInstallments - 1)

    return list;
  }

  function handlePaymentMethodChange(e: ChangeEvent<HTMLSelectElement>) {
    // const method = paymentOptions.find((opt) => opt.value === e.target.value);
    // if (method?.value) setCurrentPaymentMethod(method.value);
    if (!payment) return;

    const _option = installmenOptions?.find(
      (inst) => inst.id === Number(e.target.value)
    );
    if (!_option || !_option.id) return;
    setSelectedOption(_option.id)

    const _installments = [];
    for(var i=0; i<_option.id; i++)
      _installments.push({
          id: i+1,
          value: _option.value,
          completed: _option.completed,
        });
    //setInstallmentOptions(_installments);

    setNewPayment({...payment, installments: _installments})
  }

  const fetcher = ([userId, id]: [string, string]) =>
    requestPayment(userId, id);
  const { data: payment, error, isLoading } = useSWR(["111", "999"], fetcher);
  //setNewPayment(data);

  useEffect(() => {
    // if (newPayment) {
    //   const _installments = generateInstallmentOptions(newPayment);
    //   setInstallmentOptions(_installments);
    // }
    console.log(newPayment);
  }, [newPayment]);
  //const installments = generateInstallmentsList(payment);
  useEffect(() => {
    if (payment) {
      const _installments = generateInstallmentOptions(payment);
      setInstallmentOptions(_installments);
      setSelectedOption(payment.installments.length);
      
    }
  }, [payment]);

  return (
    <form action={sendPaymentData} className="flex flex-wrap gap-7">
      <InputField
        label="Nome completo"
        placeholder="Nome completo"
        className="flex-grow basis-[26rem]"
      />
      <InputField
        mask="999.999.999-99"
        label="CPF"
        placeholder="XXX.XXX.XXX-XX"
        className="flex-grow basis-[16rem]"
      />
      <InputField
        label="Número do cartão"
        placeholder="Número do cartão"
        className="flex-grow basis-[16em]"
      />
      <InputField
        type="date"
        label="Vencimento"
        placeholder="dd/mm"
        className="flex-grow basis-[8em]"
      />
      <InputField
        label="CVV"
        maxLength={3}
        placeholder="XXX"
        className="flex-grow basis-[8em]"
      />
      <SelectField
        label="Parcelas"
        className="flex-grow basis-[16em]"
        value={selectedOption}
        onChange={handlePaymentMethodChange}
      >
        {installmenOptions?.map((inst, i) => (
          <option key={i} value={inst.id}>
            {`${inst.id}x de ${formatToReais(inst.value)}`}
          </option>
        ))}
      </SelectField>
      <div className="flex basis-full justify-center">
        <Button className="w-full max-w-[27rem]">Pagar</Button>
      </div>
    </form>
  );
}
