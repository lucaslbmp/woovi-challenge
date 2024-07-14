import { toast } from "react-toastify"

type GenerateToastProps = {
    status: string,
    message: string
}

export function generateToast({status, message}:GenerateToastProps){
    if(status === "success")
        toast.success(message);
    else if(status === "error")
        toast.error(message);
}