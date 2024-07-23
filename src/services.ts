import { Payment } from "./types";

//const baseUrl = "http://localhost:8000";
const baseUrl = "/api";

export async function requestPaymentOptions(){
  try{
    const response = await fetch(`${baseUrl}/payments/options`);
    
    const data = response.json();
    return data;
  } catch(err){
    throw err;
  }
}

export async function requestPayment(userId: string, paymentId: string) {
  try {
    const response = await fetch(`${baseUrl}/user/${userId}/payments/${paymentId}`);
    if(!response.ok) throw new Error("");
    const _payment = await response.json();
    return _payment as Payment;
  } catch (err) {
    throw err;
  }
}

export async function createPayment(userId: string, option: string) {
  try {
    const response = await fetch(`${baseUrl}/user/${userId}/payments/create`, {
      method: "POST",
      body: JSON.stringify({
        optionId: option,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
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
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
