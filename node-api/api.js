const express = require("express");
const bodyParser = require("body-parser");
const {
  paymentOptions,
  paymentHistory,
  updatePaymentHistory,
  getPaymentHistory,
  getCurrPaymentMethod,
  setCurrPaymentMethod,
} = require("./data");
const { buildPaymentSteps } = require("./functions.js");

const app = express();

app.use(bodyParser.json());

app.get("/payments/list", async (req, res) => {
  return res.json({
    paymentOptions,
  });
});

app.get("/payments/:id/method", async (req, res) => {
  return res.json(getCurrPaymentMethod());
});

app.post("/payments/:id/method", async (req, res) => {
  const { id } = req.body;
  const paymentMethod = paymentOptions.find((method) => method.value === id);
  setCurrPaymentMethod(paymentMethod);
  return res.json({
    message: "Payment method setted successfully!",
  });
});

app.post("/payments/:id/history", async (req, res) => {
  const { id } = req.body;
  const paymentMethod = paymentOptions.find((method) => method.value === id);
  const steps = await buildPaymentSteps(paymentMethod);
  updatePaymentHistory(steps);
  return res.json({
    message: "History created successfully!",
  });
});

app.get("/payments/:id/history", async (req, res) => {
  return res.json({
    paymentHistory: getPaymentHistory(),
  });
});

// description: string;
// value: string;
// completed: boolean;
// selected: boolean;

app.patch("/payments/:paymentId/execute", async (req, res) => {
  const { id } = req.body;
  const steps = getPaymentHistory();

  if (steps?.at(id-1)) {
    const currStep = steps?.at(id-1);
    currStep.current = false;
    currStep.completed = true;
    steps[id-1] = currStep;
  }

  if (steps?.at(id)) {
    const nextStep = steps?.at(id);
    nextStep.current = true;
    steps[id] = nextStep;
  }

  updatePaymentHistory(steps);

  return res.json({
    paymentHistory: getPaymentHistory(),
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
