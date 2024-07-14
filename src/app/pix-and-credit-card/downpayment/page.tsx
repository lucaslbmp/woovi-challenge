import { paymentOptions } from "../../api/data";
import QRCodeInterface from "@/components/QRCodeInterface";
import { redirect } from "next/navigation";
import { getCurrentPaymentMethod } from "@/actions";

export default async function DownPaymentSection() {

  const currPaymentMethod = await getCurrentPaymentMethod( paymentOptions);
  if (!currPaymentMethod) redirect("/");

  return <QRCodeInterface currPaymentMethod={currPaymentMethod} />
}