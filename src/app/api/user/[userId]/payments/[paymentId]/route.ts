import { getPayment } from '@/app/api/data'
import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/db';

type UrlParams = {
  userId: string,
  paymentId: string,
}

// export async function GET(request: Request) {
//   const _payment = getPayment()
//   return NextResponse.json(_payment);
// }

export async function GET(request: Request, {params}:{params: UrlParams}) {
  const _payment = prisma.payment.findUnique({where: {id: Number(params.paymentId)}})
  return NextResponse.json(_payment);
}

export async function DELETE(request: Request, {params}:{params: UrlParams}) {
  const {paymentId} = params;
  const _payment = await prisma.payment.delete({where: {id: Number(paymentId)}});
  return NextResponse.json("Deleted payment with ID "+_payment?.id);
}