import { getPayment, paymentOptions, setPayment } from '@/app/api/data'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: Response) {
    const { optionId } = await req.json();
    const option = paymentOptions.find((method) => method.value === optionId);
    if(!option) return;

    const { 
     numberOfInstallments,
     installmentValue,
     total,
    } = option;

    const _installments = Array(numberOfInstallments - 1);
    for(var i=0; i<_installments.length; i++){
      _installments[i] = {
        id: i+1,
        value: installmentValue,
        completed: false,
      }
    }

    setPayment({
        id: "111",
        downpayment: installmentValue,
        downpaymentStatus: "open",
        total: total,
        installments: _installments,
      });
    const _newPayment = getPayment();
    console.log('new pay: ',_newPayment)
  return NextResponse.json(_newPayment)
}


// async (req, res) => {
//     const { optionId } = req.body;
//     const option = paymentOptions.find((method) => method.value === optionId);
  
//     const { 
//       numberOfInstallments,
//       installmentValue,
//       total
//     } = option;
// }