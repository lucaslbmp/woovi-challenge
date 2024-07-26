//import { paymentOptions } from '@/app/api/data'
import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const paymentOptions = await prisma.paymentOption.findMany();
  return NextResponse.json(paymentOptions)
}