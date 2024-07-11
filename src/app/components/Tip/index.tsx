import React, { ReactNode } from "react";
import './styles.css'

type TipProps = {
    children: ReactNode
}

export default function Tip({children}:TipProps) {
return(
    <div className="bg-primary text-textTerciary h-8 px-2.5 py-1.5 align-middle rounded-md card-path">
        {children}
    </div>
)
}