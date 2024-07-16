import { Payment } from "@/types";

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function formatToReais(value) {
  return value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export function buildPaymentSteps(payment) {
  if(payment) console.log(JSON.parse(JSON.stringify(payment)))
  if (!payment?.installments?.length) return undefined;
  const steps = [
    {
      description: "1ª entrada no PIX",
      value: formatToReais(payment.downpayment),
      completed: payment.downpaymentStatus === "done",
      current: !payment.installments.at(0)?.completed,
    },
  ];
  for (var i = 0; i < payment.installments.length; i++) {
    steps.push({
      description: i + 2 + "ª no cartão",
      value: formatToReais(payment.installments?.at(i)?.value ?? 0),
      completed: steps?.at(i+1)?.completed ?? false,
      current: !!steps?.at(i)?.completed,
    });
  }
  return steps;
}

