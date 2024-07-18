import React, { ChangeEventHandler } from "react";
import Checkbox from "@/components/Checkbox";
import Tip from "../Tip";
import { formatToReais } from "@/utils/functions";

type OptionCardProps = {
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
  className?: string;
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
  const installmentValueStr = formatToReais(installmentValue);

  const totalStr = total ? formatToReais(total) : "0,00";

  return (
    <section
      className={
        "rounded-[10px] border-2 border-secondary flex flex-col gap-1 p-5 [&:has(input:checked)]:bg-highlightSecondary [&:has(input:checked)]:border-highlight [&:has(input:checked)]:border-b-2" +
        " " +
        className
      }
    >
      {title && (
        <header className="font-nunitoBold text-lg mt-[-2em] bg-secondary absolute px-3 rounded-xl">
          {title}
        </header>
      )}
      <div className="flex flex-row items-center">
        <div className="text-2xl flex-1">
          <strong className="font-nunitoBold m">
            {numberOfInstallments}x{" "}
          </strong>
          <span>{installmentValueStr}</span>
        </div>
        <Checkbox id={value} className="text-right" name="payment" value={value} />
      </div>
      {highlighted && <span className="text-highlight">{highlighted}</span>}
      {tip && (
        <div>
          <Tip>
            <span>
              <b>{tip.highlight}</b>
              {tip.text.replace(tip.highlight, "")}
            </span>
          </Tip>
        </div>
      )}
      {total && <span className="text-textSecondary">Total: {totalStr}</span>}
    </section>
  );
}
