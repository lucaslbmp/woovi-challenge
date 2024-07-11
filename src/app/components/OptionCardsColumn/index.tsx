import OptionCard from "../OptionCard";

type OptionCardsColumnProps = {
  title: string;
  options: React.ComponentProps<typeof OptionCard>[];
};

export default function OptionCardsColumn({
  title,
  options,
}: OptionCardsColumnProps) {
  const cardClassname =
    "[&:not(:last-of-type)]:rounded-b-none [&:not(:first-of-type)]:rounded-t-none [&:not(:last-child)]:border-b-0";

  return (
    <div className="">
      {options?.at(0) && <OptionCard key={0} {...options[0]} title={title} className={cardClassname}/>}
      {options?.slice(1)?.map((option, index) => (
        <OptionCard key={index} {...option} className={cardClassname} />
      ))}
    </div>
  );
}
