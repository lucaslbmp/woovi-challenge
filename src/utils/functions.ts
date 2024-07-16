import { InstallmentOption, Payment, PaymentMethod } from "@/types";

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function formatToReais(value: number) {
  return value?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export function buildPaymentSteps(payment: Payment | undefined) {
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
      completed: steps?.at(i + 1)?.completed ?? false,
      current: !!steps?.at(i)?.completed,
    });
  }
  return steps;
}

export function generateInstallmentOptions(
  payment: Payment | undefined,
  paymentOptions: PaymentMethod[],
  
) {
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

  return list;
}

export function generateInstallments(
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
