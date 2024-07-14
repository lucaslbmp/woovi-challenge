import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPayment } from "./services";
import { retrievePayment, storePayment } from "./cookiesActions";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const _payment = await getPayment("111","999");
  // const paymentStr = JSON.stringify(_payment)
  // response.cookies.set("payment", paymentStr);
  return response;
}
