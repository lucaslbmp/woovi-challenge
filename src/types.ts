import React from "react";

export type PaymentMethod = {
  value: string;
  title?: string;
  numberOfInstallments: number;
  installmentValue: number;
  highlighted?: string;
  tip?: {
    highlight: string;
    text: string;
  };
  total?: number;
};

export type Payment = {
  id: string;
  downpayment: number,
  downpaymentStatus: string, 
  total: number, 
  installments: {
    id: number,
    value: number,
    completed: boolean,
  }[],
}

export type Step = {
  description: string;
  value: string;
  completed: boolean;
  current: boolean;
};
