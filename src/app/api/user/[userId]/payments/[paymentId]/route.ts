import { getPayment } from '@/app/api/data'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const _payment = getPayment()
  return NextResponse.json(_payment);
}