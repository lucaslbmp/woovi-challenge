//import { paymentOptions } from '@/app/api/data'
import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/db';

export async function GET(request: Request) {
  const paymentOptions = await prisma.paymentOption.findMany();
  return NextResponse.json(paymentOptions)
}