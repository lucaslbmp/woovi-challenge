import { getCurrentPaymentMethod } from "@/actions";
import { paymentOptions } from "../../api/data";
import PaymentForm from "@/components/PaymentForm";
import { redirect } from "next/navigation";

export default async function InstallmentsSection() {
    
    const currPaymentMethod = await getCurrentPaymentMethod( paymentOptions);
    if (!currPaymentMethod) redirect("/");

    return(
        <PaymentForm paymentMethod={currPaymentMethod}/>
    )
}