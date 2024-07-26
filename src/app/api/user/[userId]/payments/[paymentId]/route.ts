import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/db";

type UrlParams = {
  userId: string;
  paymentId: string;
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: UrlParams }) {
  const _payment = await prisma.payment.findFirst({
    where: { id: Number(params.paymentId) },
    include: { installments: true },
  });
  return NextResponse.json(_payment);
}

export async function DELETE(
  request: Request,
  { params }: { params: UrlParams }
) {
  const { paymentId } = params;
  const _payment = await prisma.payment.delete({
    where: { id: Number(paymentId) },
  });
  return NextResponse.json("Deleted payment with ID " + _payment?.id);
}
