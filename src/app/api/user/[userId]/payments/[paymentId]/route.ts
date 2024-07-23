import { getPayment } from '@/app/api/data'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json(getPayment())
}