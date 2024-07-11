import React, { ChangeEventHandler } from "react";
import Checkbox from "@/components/Checkbox";
import Tip from "../Tip";
import { formatToReais } from "@/app/utils/functions";

type OptionCardProps = {
  value: string;
  title?: string;
  numberOfInstallments: number;
  installmentValue: number;
  highlighted?: string;
  tip?: React.ReactNode;
  total?: number;
  className?: string,
};

export default function OptionCard({
  value,
  title,
  numberOfInstallments,
  installmentValue,
  highlighted,
  tip,
  total,
  className,
}: OptionCardProps) {

  const installmentValueStr = formatToReais(installmentValue)

  const totalStr = formatToReais(total);

  return (
    <section className={"rounded-[10px] border-2 border-secondary flex flex-col gap-1 p-5" + " " + className}>
      {title && <header className="font-nunitoBold text-lg mt-[-2em] bg-secondary absolute px-3 rounded-xl">{title}</header>}
      <div className="flex flex-row items-center">
        <div className="text-2xl flex-1">
          <strong className="font-nunitoBold m">
            {numberOfInstallments}x{" "}
          </strong>
          <span>{installmentValueStr}</span>
        </div>
        <Checkbox className="text-right" name="payment" value={value}/>
      </div>
      {highlighted && <span className="text-highlight">{highlighted}</span>}
      {tip && (
        <div>
          <Tip>
            {tip}
          </Tip>
        </div>
      )}
      {total && <span className="text-textSecondary">Total: {totalStr}</span>}
    </section>
  );
}
