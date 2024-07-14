"use client";

import { Payment } from "@/types";
import { createContext, useContext, useState } from "react";

type PaymentContextProps = {
  children: React.ReactNode;
};

interface ContextType {
  payment?: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment | undefined>>;
}

const defaultValue = {
  payment: undefined,
  setPayment: () => {},
};

export const PaymentContext = createContext<ContextType>(defaultValue);

function PaymentContextProvider({ children }: PaymentContextProps) {
  const [payment, setPayment] = useState<Payment>();

  return (
    <PaymentContext.Provider value={{ payment, setPayment }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (context === undefined) {
      throw new Error('usePayment must be used within a PaymentContextProvider');
    }
    return context;
  };
  

export default PaymentContextProvider;
