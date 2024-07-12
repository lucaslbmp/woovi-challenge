"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PaymentMethod, Step } from "./types";
import { formatToReais } from "./app/utils/functions";
import { paymentOptions } from "./app/data";

export async function paymentChoiceAction(formData: FormData) {
    const payment = formData.get("payment") as string;
    if (!payment) {
      alert("Nenhuma opção foi selecionada!");
      return;
    }
    await setCurrentPaymentMethod(payment);
    const paymentMethod = await getCurrentPaymentMethod(paymentOptions);
    if(!paymentMethod) return;
    redirect("/pix-and-credit-card/downpayment");
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

export async function buildPaymentSteps(paymentMethod: PaymentMethod) {
  if (!paymentMethod.numberOfInstallments) return undefined;
  const steps = [
    {
      description: "1ª entrada no PIX",
      value: formatToReais(paymentMethod.installmentValue),
      completed: false,
      selected: true,
    },
  ];
  for (var i = 1; i < paymentMethod.numberOfInstallments; i++) {
    steps.push({
      description: i + 1 + "ª no cartão",
      value: formatToReais(paymentMethod.installmentValue),
      completed: false,
      selected: false,
    });
  }
  return steps;
}

export async function getPaymentSteps() {
  const cookieStore = cookies();
  try {
    const stepsStr = cookieStore.get("steps")?.value;
    if (typeof stepsStr !== "string") return;
    return JSON.parse(stepsStr);
  } catch (err) {
    return null;
  }
}

export async function savePaymentSteps(steps: Step[]) {
  const cookieStore = cookies();
  try {
    const stepsJson = JSON.stringify(steps);
    console.log(stepsJson);
    cookieStore.set("steps", stepsJson);
  } catch (err) {
    throw err;
  }
}

export async function mockFirstPayment() {
  try {
    const stepsArray = await getPaymentSteps();
    stepsArray.map(
      (step: any, i: number) => (step.completed = i === 0 ? true : false)
    );
    stepsArray[1].selected = true;
    savePaymentSteps(stepsArray);
  } catch (err) {
    return;
  }
}

export async function mockUndoFirstPayment() {
  try {
    const stepsArray = await getPaymentSteps();
    stepsArray.map((step: any) => (step.completed = false));
    stepsArray.map(
      (step: any, i: number) => (step.selected = i === 0 ? true : false)
    );
    savePaymentSteps(stepsArray);
  } catch (err) {
    return;
  }
}
