"use client";

import { Payment, PaymentMethod } from "@/types";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { paymentOptions } from "../../../node-api/data";
import { formatToReais } from "@/utils/functions";
import Button from "../Button";
import { sendPaymentData, setCurrentPaymentMethod } from "@/actions";
import { ChangeEvent, use, useCallback, useEffect, useState } from "react";
import { getPayment } from "@/services";
import { usePaymentContext } from "@/contexts/global-context";
import useSWR from "swr";
// import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";

type PaymentFormProps = {
  paymentMethod: PaymentMethod;
};

export default function PaymentForm({ paymentMethod }: PaymentFormProps) {
  const selectedMethod = paymentOptions.find(
    (method) => method.value === paymentMethod.value
  );
  function handlePaymentMethodChange(e: ChangeEvent<HTMLSelectElement>) {
    const method = paymentOptions.find((opt) => opt.value === e.target.value);
    if (method?.value) setCurrentPaymentMethod(method.value);
  }
  //const [paymentInfo, setPaymentInfo] = useState(undefined);
  // setCookie('test', '2');
  // const test = getCookie('test');
  //console.log(test)

  //console.log(payment);
  // const { payment, setPayment } = usePaymentContext();
  
  // const getPaymentData = async () => {
  //     try {
  //       //const _payment = await getPayment("111","999");
  //       //setPayment(_payment);

  //       const response = await fetch(
  //         "https://httpbin.org/get"
  //       );
  //       const data = await response.json();
  //       return data;
  //     } catch (err) {
  //       console.log(err);
  //       throw err;
  //     }
  //   };

  // useEffect(() => {
  //   getPaymentData();
  // }, [setPayment]);

  // useEffect(() => {
  //   console.log(payment);
  // }, [payment]);

  // http://localhost:8000/user/111/payments/999

  // const fetcher = (url: string) => fetch(url).then((res) => res.json()) as Promise<Payment>
  // const {data: payment, error, isLoading} = useSWR("http://localhost:8000/user/111/payments/999", fetcher)

  const fetcher = ([userId, id] : [string, string]) => getPayment(userId, id)
  const {data: payment, error, isLoading} = useSWR(["111","999"], fetcher)
  //console.log(data)

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
        value={selectedMethod?.value}
        onChange={handlePaymentMethodChange}
      >
        {payment?.installments?.length &&
          payment?.installments?.map((method, i) => (
            <option key={i} value={method.value}>
              {`${payment?.installments?.length}x de ${formatToReais(
                payment?.installments?.at(0)?.value
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
