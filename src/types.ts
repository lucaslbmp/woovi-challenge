import React from "react";

export type PaymentMethod = {
  value: string;
  title?: string;
  numberOfInstallments: number;
  installmentValue: number;
  highlighted?: string;
  tip?: React.ReactNode;
  total?: number;
};

export type Step = {
  description: string;
  value: string;
  completed: boolean;
  selected: boolean;
};
