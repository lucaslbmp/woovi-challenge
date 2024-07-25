import { Payment } from "./types";

//const baseUrl = "http://localhost:8000";
const baseUrl = "http://localhost:3000/api";

export async function requestPaymentOptions() {
  try{
    const response = await fetch(`${baseUrl}/payments/options`);
    if(!response.ok) throw new Error("");
    const data = await response.json();
    return data;
  } catch(err){
    throw err;
  }
}

export async function requestPayments(userId: string) {
  try {
    const response = await fetch(`${baseUrl}/user/${userId}/payments`, {cache: "no-cache"});
    if(!response.ok) throw new Error("");
    const _payments = await response.json();
    return _payments as Payment[];
  } catch (err) {
    throw err;
  }
}

export async function requestPayment(userId: string, paymentId: string) {
  try {
    if(!paymentId) throw new Error("Invalid payment ID");
    const response = await fetch(`${baseUrl}/user/${userId}/payments/${paymentId}`, {cache: "no-cache"});
    if(!response.ok) throw new Error("Payment not found");
    const _payment = await response.json();
    return _payment as Payment;
  } catch (err) {
    throw err;
  }
}

export async function createPayment(userId: string, option: string) {
  try {
    const response = await fetch(`${baseUrl}/user/${userId}/payments`, {
      method: "POST",
      body: JSON.stringify({
        optionId: option,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache"
    });
    if(!response.ok) throw new Error(""); 
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function executeDownpayment(userId: string, paymentId: string) {
  try {
    const response = await fetch(
      `${baseUrl}/user/${userId}/payments/${paymentId}/execute/downpayment`,
      {
        method: "PATCH",
        // body: JSON.stringify({
        //   ...payment,
        // }),
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache"
      }
    );
    
    return response;
  } catch (err) {
    throw err;
  }
}
