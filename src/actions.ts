"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Payment, PaymentMethod, Step } from "./types";
import { formatToReais } from "./utils/functions";
import { paymentOptions } from "./app/api/data";
import { createPayment, executeDownpayment } from "./services";
//import {toast} from 'react-toastify'

export async function paymentChoiceAction(prevState: any,formData: FormData) {
  try {
    const paymentOption = formData.get("payment") as string;
    if (!paymentOption) {
      //toast("Nenhuma opção foi selecionada!");
      return {
        status: "error",
        message: "Nenhuma opção selecionada!"
      };
    }
    await createPayment("111", paymentOption);
    return {status: "success", message: "Forma de pagamento escolhida com sucesso!"}
    //redirect("/pix-and-credit-card/downpayment");
  } catch (err) {
    return { status: "success", message: "Escolha de pagamento mal sucedida!"}
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

export async function setCurrentPaymentMethod(method: string) {
  const cookieStore = cookies();
  cookieStore.set("paymentMethod", method);
}

export async function getCurrentPaymentMethod(paymentOptions: PaymentMethod[]) {
  const cookieStore = cookies();
  const paymentMethodName = cookieStore.get("paymentMethod")?.value;
  return paymentOptions.find((opt) => opt.value === paymentMethodName);
}

export async function sendPaymentData(formData: FormData) {
  // Here we make API request to perform the payment operation
}


// export async function getPaymentSteps() {
//   const cookieStore = cookies();
//   try {
//     const stepsStr = cookieStore.get("steps")?.value;
//     if (typeof stepsStr !== "string") return;
//     return JSON.parse(stepsStr);
//   } catch (err) {
//     return null;
//   }
// }

// export async function savePaymentSteps(steps: Step[]) {
//   const cookieStore = cookies();
//   try {
//     const stepsJson = JSON.stringify(steps);
//     //console.log(stepsJson);
//     cookieStore.set("steps", stepsJson);
//   } catch (err) {
//     throw err;
//   }
// }

// export async function retrievePayment() {
//   const cookieStore = cookies();
//   try {
//     const paymentStr = cookieStore.get("payment")?.value;
//     if (typeof paymentStr !== "string") return;
//     return JSON.parse(paymentStr);
//   } catch (err) {
//     return null;
//   }
// }

// export function storePayment(payment: Payment) {
//   const cookieStore = cookies();
//   try {
//     const paymentJson = JSON.stringify(payment);
//     cookieStore.set("payment", paymentJson);
//   } catch (err) {
//     throw err;
//   }
// }

// export async function mockFirstPayment() {
//   try {
//     const stepsArray = await getPaymentSteps();
//     stepsArray.map(
//       (step: any, i: number) => (step.completed = i === 0 ? true : false)
//     );
//     stepsArray[1].current = true;
//     savePaymentSteps(stepsArray);
//   } catch (err) {
//     return;
//   }
// }

// export async function mockUndoFirstPayment() {
//   try {
//     const stepsArray = await getPaymentSteps();
//     stepsArray.map((step: any) => (step.completed = false));
//     stepsArray.map(
//       (step: any, i: number) => (step.current = i === 0 ? true : false)
//     );
//     savePaymentSteps(stepsArray);
//   } catch (err) {
//     return;
//   }
// }
