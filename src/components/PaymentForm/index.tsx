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
  //const [newPayment, setNewPayment] = useState<Payment>();
  const { payment: newPayment, setPayment: setNewPayment } =
    usePaymentContext();
  const [selectedOption, setSelectedOption] = useState(1);
  const [installmenOptions, setInstallmentOptions] =
    useState<InstallmentOption[]>();

  function generateInstallmentOptions(payment?: Payment) {
    console.log(payment);
    if (!payment) return [];
    // const list = [{ id: 1, value: payment.total, completed: payment.downpaymentStatus === "done" }];
    const list: InstallmentOption[] = [];

    const completedInstallments = payment.installments.filter(
      (inst) => inst.completed
    );

    list.push(
      ...completedInstallments.map((inst) => ({
        numberOfInstallments: inst.id,
        installmentValue: inst.value,
      }))
    );

    const lastIndex = payment.installments.findLastIndex(
      (inst) => inst.completed
    );

    const totalDeducted =
      (payment.downpaymentStatus === "done" ? payment.downpayment : 0) +
      completedInstallments.reduce((sum, inst) => sum + inst.value, 0);

    const totalInstallmentsValue = payment.total - totalDeducted;
    const calcInstallmentValue = (total: number) =>
      payment.downpaymentStatus === "done" ? total / (i + 1) : total / (i + 2);

    console.log(totalInstallmentsValue);

    for (var i = lastIndex + 1; i < paymentOptions.length - 1; i++) {
      list.push({
        numberOfInstallments: i + 1,
        installmentValue: calcInstallmentValue(totalInstallmentsValue),
      });
    }

    // const _numberOfInstallments = (payment.downpaymentStatus !== "done" && numberOfInstallments >= 1)
    // ? numberOfInstallments
    // : (numberOfInstallments - 1)

    return list;
  }

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

  function generateInstallments(
    _option: InstallmentOption,
    lastPayment: Payment
  ) {
    const _installments = [];
    for (var i = 0; i < _option.numberOfInstallments; i++)
      _installments.push({
        id: i + 1,
        value: _option.installmentValue,
        completed: lastPayment.installments.at(i)?.completed ?? false,
      });
    return _installments;
  }

  function handlePaymentMethodChange(e: ChangeEvent<HTMLSelectElement>) {
    if (!payment) return;

    const _option = updateSelectedOption(e.target.value);
    if (!_option) return;
    
    const _newInstallments = generateInstallments(_option, payment);

    // Updating payment state with data from the new selected payment form
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
      const _installments = generateInstallmentOptions(payment);
      console.log(_installments);
      setInstallmentOptions(_installments);
      setSelectedOption(payment.installments.length);
      setNewPayment(payment);
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
          <option key={i} value={inst.numberOfInstallments}>
            {`${inst.numberOfInstallments}x de ${formatToReais(
              inst.installmentValue
            )}`}
          </option>
        ))}
      </SelectField>
      <div className="flex basis-full justify-center">
        <Button className="w-full max-w-[27rem]">Pagar</Button>
      </div>
    </form>
  );
}
