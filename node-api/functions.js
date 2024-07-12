module.exports = {
  formatToReais: function(value) {
    return value?.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  },
  buildPaymentSteps: function(paymentMethod) {
    if (!paymentMethod.numberOfInstallments) return undefined;
    const steps = [
      {
        description: "1ª entrada no PIX",
        value: module.exports.formatToReais(paymentMethod.installmentValue),
        completed: false,
        current: true,
      },
    ];
    console.log(paymentMethod)
    for (var i = 1; i < paymentMethod.numberOfInstallments; i++) {
      steps.push({
        description: i + 1 + "ª no cartão",
        value: module.exports.formatToReais(paymentMethod.installmentValue),
        completed: false,
        current: false,
      });
    }
    return steps;
  }
}