import { InstallmentOption, Payment, PaymentMethod } from "@/types";

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function checkCpf(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  var result = true;
  [9, 10].forEach(function (j) {
    var soma = 0,
      r;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach(function (e, i) {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (String(r) !== cpf.substring(j, j + 1)) result = false;
  });
  return result;
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
  paymentOptions: PaymentMethod[]
) {
  console.log(payment);
  if (!payment) return [];
  // const list = [{ id: 1, value: payment.total, completed: payment.downpaymentStatus === "done" }];
  const list: InstallmentOption[] = [];

  const completedInstallments = payment.installments?.filter(
    (inst) => inst.completed
  );

  const optionsForCompletedSteps = completedInstallments?.map((inst) => ({
    numberOfInstallments: inst.id,
    installmentValue: inst.value,
  }));

  if (optionsForCompletedSteps) 
    list.push(...optionsForCompletedSteps);

  const lastIndex = payment?.installments?.findLastIndex(
    (inst) => inst.completed
  );

  const totalDeducted =
    (payment.downpaymentStatus === "done" ? payment.downpayment : 0) +
    completedInstallments?.reduce((sum, inst) => sum + inst.value, 0) ?? 0;

  const totalInstallmentsValue = payment.total - totalDeducted;
  const calcInstallmentValue = (total: number) =>
    payment.downpaymentStatus === "done" ? total / (i + 1) : total / (i + 2);

  console.log(totalInstallmentsValue);

  for (var i = lastIndex + 1; i < paymentOptions.length - 1; i++) {
    list?.push({
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
