"use client";
import React, { ChangeEventHandler } from "react";
import { formatToReais } from "@/utils/functions";
import { useRouter } from "next/navigation";

type PaymentCardProps = {
  paymentId: string;
  title?: string;
  numberOfInstallments: number;
  installmentValue: number;
  downpayment: number;
  total?: number;
  className?: string;
};

export default function PaymentCard({
  paymentId,
  title,
  numberOfInstallments,
  installmentValue,
  downpayment,
  total,
  className,
}: PaymentCardProps) {
  const installmentValueStr = formatToReais(installmentValue);

  const totalStr = total ? formatToReais(total) : "R$0,00";

  const router = useRouter();

  function handleClickCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    router.push(`/payments/${paymentId}`)
  }

  return (
    <section
      className={
        "rounded-[10px] border-2 border-secondary flex flex-col gap-1 p-5 [&:has(input:checked)]:bg-highlightSecondary [&:has(input:checked)]:border-highlight [&:has(input:checked)]:border-b-2" +
        " " +
        className
      }
    >
      {/* {title && (
        <header className="font-nunitoBold text-lg mt-[-2em] bg-secondary absolute px-3 rounded-xl">
          {title}
        </header>
      )} */}
      <div className="flex flex-row items-center cursor-pointer" id={paymentId} onClick={handleClickCard}>
        {total && <div className="text-2xl flex-1">{total}</div>}
        <span className="text-lg">{formatToReais(downpayment)} + {numberOfInstallments}x {installmentValueStr}</span>
      </div>
      {total && <span className="text-textSecondary">Total: {totalStr}</span>}
    </section>
  );
}
