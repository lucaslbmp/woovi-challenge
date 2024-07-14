const express = require("express");
const bodyParser = require("body-parser");
const {
  paymentOptions,
  paymentHistory,
  updatePaymentHistory,
  getPaymentHistory,
  getPayment,
  setPayment,
} = require("./data");
const { buildPaymentSteps } = require("./functions.js");

const app = express();

app.use(bodyParser.json());

app.get("/payments/options", async (req, res) => {
  return res.json({
    paymentOptions,
  });
});

app.get("/user/:userId/payments/:id", async (req, res) => {
  return res.json(getPayment());
});

app.post("/user/:userId/payments/create", async (req, res) => {
  const { optionId } = req.body;
  const option = paymentOptions.find((method) => method.value === optionId);

  const { 
    numberOfInstallments,
    installmentValue,
    total
  } = option;

  const _installments = Array(numberOfInstallments - 1);
  for(var i=0; i<_installments.length; i++){
    _installments[i] = {
      id: i+1,
      value: installmentValue,
      completed: false,
    }
  }

  setPayment({
    id: "111",
    downpayment: installmentValue,
    downpaymentStatus: "open",
    total: total,
    installments: _installments,
  });

  return res.json({
    message: "Payment method setted successfully!",
  })
});

// app.post("/payments/:id/history", async (req, res) => {
//   const { id } = req.body;
//   const paymentMethod = paymentOptions.find((method) => method.value === id);
//   const steps = await buildPaymentSteps(paymentMethod);
//   updatePaymentHistory(steps);
//   return res.json({
//     message: "History created successfully!",
//   });
// });

// app.get("/payments/:id/history", async (req, res) => {
//   return res.json({
//     paymentHistory: getPaymentHistory(),
//   });
// });

// description: string;
// value: string;
// completed: boolean;
// selected: boolean;

app.patch("/user/:userId/payments/:paymentId/execute/downpayment", async (req, res) => {
  const payment = getPayment();
  setPayment({
    ...payment,
    downpaymentStatus: "done",
  });

  return res.json({
    message: "Downpayment executed successfully",
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
