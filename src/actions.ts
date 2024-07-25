"use server";

import { redirect } from "next/navigation";
import { createPayment, executeDownpayment } from "./services";
//import {toast} from 'react-toastify'

export async function paymentChoiceAction(prevState: any, formData: FormData) {
  try {
    const paymentOption = formData.get("payment") as string;
    if (!paymentOption) {
      return {
        status: "error",
        message: "Nenhuma opção selecionada!",
      };
    }
    const payment = await createPayment("111", paymentOption);

    return {
      status: "success",
      message: "Forma de pagamento escolhida com sucesso!",
      state: JSON.stringify(payment),
    };
  } catch (err) {
    return { status: "error", message: "Erro ao gerar pagamento!" };
  }
}

// export async function qrCodeFormAction(prevState: any, formData: FormData) {
//   try {
//     const response = await executeDownpayment("111","5");
//     if(!response.ok) return;
//     redirect(`/payments/${paymentId}/installments`)

//   } catch (err) {
//     throw err;
//   }
// }

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
  redirect("/success");
}
