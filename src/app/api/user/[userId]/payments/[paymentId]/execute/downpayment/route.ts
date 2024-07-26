//import { getPayment, setPayment } from "@/app/api/data";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import prisma from "../../../../../../../../../prisma/db";

type UrlParams = {
  userId: string;
  paymentId: string;
};

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: UrlParams }) {
  const _payment = await prisma.payment.findUnique({
    where: { id: Number(params.paymentId) },
  });
  if(!_payment) 
    return NextResponse.json({
    message: "Error: Payment does not exist!",
  });
  const _newPayment = await prisma.payment.update({
    data: {
      downpaymentStatus: "done"
    },
    where: {id: _payment.id}
  })

  return NextResponse.json({
    message: "Downpayment executed successfully",
  });
}
