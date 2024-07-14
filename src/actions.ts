"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Payment, PaymentMethod, Step } from "./types";
import { formatToReais } from "./utils/functions";
import { paymentOptions } from "../node-api/data";
import { createPayment, executeDownpayment } from "./services";

export async function paymentChoiceAction(formData: FormData) {
  try {
    const paymentOption = formData.get("payment") as string;
    if (!paymentOption) {
      alert("Nenhuma opção foi selecionada!");
      return;
    }
    await createPayment("111", paymentOption);
    redirect("/pix-and-credit-card/downpayment");
  } catch (err) {
    throw err;
  }
}

export async function qrCodeFormAction(formData: FormData) {
  try {
    const response = await executeDownpayment("111", "999");
    if(response.ok) return new Error('QR code não validado!');
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

export async function buildPaymentSteps(payment: Payment) {
  if (!payment?.installments?.length) return undefined;
  const steps = [
    {
      description: "1ª entrada no PIX",
      value: formatToReais(payment.downpayment),
      completed: payment.downpaymentStatus === "done",
      current: !payment.installments.at(0)?.completed,
    },
  ];
  for (var i = 1; i < payment.installments.length; i++) {
    steps.push({
      description: i + 1 + "ª no cartão",
      value: formatToReais(payment.installments?.at(i)?.value),
      completed: steps?.at(i)?.completed ?? false,
      current: !!steps?.at(i - 1)?.completed,
    });
  }
  return steps;
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
