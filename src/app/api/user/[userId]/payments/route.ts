import data from "@/app/api/data";
import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";

type UrlParams = {
  userId: string;
};

export async function POST(request: Request) {
  const _payment = prisma.payment.create({
    data: {
      id: 999,
      downpayment: 10196.66,
      downpaymentStatus: "open",
      total: 30620.0,
      installments: {
        create: [
          { value: 10196.66, completed: false },
          { value: 10196.66, completed: false },
        ],
      },
    },
  });
  return NextResponse.json(_payment);
}
