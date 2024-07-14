import { cookies } from "next/headers";
import { Payment } from "./types";

export function storePayment(payment: Payment) {
  const cookieStore = cookies();
  try {
    const paymentJson = JSON.stringify(payment);
    cookieStore.set("payment", paymentJson);
  } catch (err) {
    throw err;
  }
}

export function retrievePayment() {
  const cookieStore = cookies();
  try {
    const paymentStr = cookieStore.get("payment")?.value;
    if (typeof paymentStr !== "string") return;
    return JSON.parse(paymentStr);
  } catch (err) {
    return null;
  }
}
