import { paymentOptions } from "../../../../node-api/data";
import QRCodeInterface from "@/components/QRCodeInterface";
import { redirect } from "next/navigation";
import { getCurrentPaymentMethod, mockUndoFirstPayment } from "@/actions";

export default async function DownPaymentSection() {

  mockUndoFirstPayment();

  const currPaymentMethod = await getCurrentPaymentMethod( paymentOptions);
  if (!currPaymentMethod) redirect("/");

  return <QRCodeInterface currPaymentMethod={currPaymentMethod} />
}