import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";

type UrlParams = {
  userId: string;
};
export const dynamic = 'force-dynamic';

async function getDataFromOptionId(optionId: string) {
  const _option = await prisma.paymentOption.findFirst({
    where: { value: optionId },
  });
  if (!_option) return;
  const { installmentValue, numberOfInstallments, total } = _option;
  return {
    downpayment: installmentValue,
    downpaymentStatus: "open",
    total: total ?? 0,
    installments: {
      create: Array((Number(_option?.numberOfInstallments) ?? 1) - 1).fill({
        value: _option?.installmentValue,
        completed: false,
      }),
      //   create: [
      //     ,
      //     { value: 10196.66, completed: false },
      //   ],
    },
  };
}

export async function POST(request: Request) {
  const data = await request.json();
  const createDto = data.optionId
    ? (await getDataFromOptionId(data.optionId)) ?? { ...data }
    : { ...data };

  const _payment = await prisma.payment.create({
    data: { ...createDto },
    include: {
      installments: true,
    },
  });
  return NextResponse.json(_payment);
}

export async function GET(request: Request, { params }: { params: UrlParams }) {
    const _payment = await prisma.payment.findMany({
      include: { installments: true },
    });
    return NextResponse.json(_payment);
  }
