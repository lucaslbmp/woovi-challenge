"use client";

import { PaymentMethod } from "@/types";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { paymentOptions } from "@/app/data";
import { formatToReais } from "@/app/utils/functions";
import Button from "../Button";
import { sendPaymentData, setCurrentPaymentMethod } from "@/actions";
import { ChangeEvent } from "react";

type PaymentFormProps = {
  paymentMethod: PaymentMethod;
};

export default function PaymentForm({ paymentMethod }: PaymentFormProps) {
  const selectedMethod = paymentOptions.find(
    (method) => method.value === paymentMethod.value
  );
  function handlePaymentMethodChange(e: ChangeEvent<HTMLSelectElement>){
    const method = paymentOptions.find(opt => opt.value === e.target.value);
    if(method?.value) setCurrentPaymentMethod(method.value);
  }
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
        {paymentOptions.map((method, i) => (
          <option key={i} value={method.value}>
            {`${method.numberOfInstallments}x de ${formatToReais(
              method.installmentValue
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
