"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Payment, PaymentMethod, Step } from "./types";
import { formatToReais } from "./utils/functions.ts";
import { paymentOptions } from "./app/api/data";
import { createPayment, executeDownpayment } from "./services";
//import {toast} from 'react-toastify'

export async function paymentChoiceAction(prevState: any,formData: FormData) {
  try {
    const paymentOption = formData.get("payment") as string;
    if (!paymentOption) {
      return {
        status: "error",
        message: "Nenhuma opção selecionada!"
      };
    }
    const response = await createPayment("111", paymentOption);
    
    return {status: "success", message: "Forma de pagamento escolhida com sucesso!"}
  } catch (err) {
    return { status: "error", message: "Erro ao gerar pagamento!"}
  }
}

export async function qrCodeFormAction(formData: FormData) {
  try {
    const response = await executeDownpayment("111", "999");
    if(!response.ok) return;
    redirect('/pix-and-credit-card/installments')

  } catch (err) {
    throw err;
  }
}

// export async function setCurrentPaymentMethod(method: string) {
//   const cookieStore = cookies();
//   cookieStore.set("paymentMethod", method);
// }

// export async function getCurrentPaymentMethod(paymentOptions: PaymentMethod[]) {
//   const cookieStore = cookies();
//   const paymentMethodName = cookieStore.get("paymentMethod")?.value;
//   return paymentOptions.find((opt) => opt.value === paymentMethodName);
// }

export async function sendPaymentData(formData: FormData) {
  // Here we make API request to perform the payment operation
  redirect("/success")
}