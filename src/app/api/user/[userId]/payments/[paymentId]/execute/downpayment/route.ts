import { getPayment, setPayment } from "@/app/api/data";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, res: Response) {
  const payment = getPayment();
  setPayment({
    ...payment,
    downpaymentStatus: "done",
  });

  return NextResponse.json({
    message: "Downpayment executed successfully",
  });
}
