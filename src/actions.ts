"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function setSelectedPaymentMethod(method: string){
    const cookieStore = cookies();
    cookieStore.set("paymentMethod", method);
    redirect('payment-method/pix-and-credit-card')
}