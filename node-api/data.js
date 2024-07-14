module.exports = {
  paymentOptions: [
    {
      value: "opt1",
      numberOfInstallments: 1,
      installmentValue: 30500,
      highlighted: "Ganhe 3% de Cashback",
      tip: {
        highlight: "300,00",
        text: "🤑 300,00 de volta no seu Pix na hora"
      },
    },
    {
      value: "opt2",
      numberOfInstallments: 2,
      installmentValue: 15300,
      total: 30600,
    },

    {
      value: "opt3",
      numberOfInstallments: 3,
      installmentValue: 10196.66,
      total: 30620,
    },

    {
      value: "opt4",
      numberOfInstallments: 4,
      installmentValue: 7725,
      tip: {
        highlight: "-3% de juros:",
        text: "-3% de juros: Melhor opção de parcelamento"
      },
      total: 30900,
    },

    {
      value: "opt5",
      numberOfInstallments: 5,
      installmentValue: 6300,
      total: 31500,
    },

    {
      value: "opt6",
      numberOfInstallments: 6,
      installmentValue: 5283.33,
      total: 31699.98,
    },

    {
      value: "opt7",
      numberOfInstallments: 7,
      installmentValue: 4545.85,
      total: 31800,
    },
  ],

  payment: {},
  setPayment: (payment) => {
    module.exports.payment = {...payment}
  },
  getPayment: () => {
    return  module.exports.payment;
  },

  paymentHistory: [],
  updatePaymentHistory: (newHistory) =>{ 
    module.exports.paymentHistory = [...newHistory]
  },
  getPaymentHistory: () => {
    return  module.exports.paymentHistory;
  }
};
