import Image from "next/image";
import { getRandomInt } from "../../utils/functions";

type CheckboxProps = {
  id: string;
  name: string;
  disabled?: boolean;
  className?: string;
};

export default function Checkbox({
  name,
  disabled = false,
  className,
}: CheckboxProps) {
  const id = getRandomInt(1, 1000000).toString();

  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={id}
        //disabled={disabled}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        className={
          "w-[1.625rem] h-[1.625rem] border-secondary border-2 rounded-full peer-checked:bg-highlight cursor-pointer select-none float-right"
        }
      >
        <Image
          src="/checkmark.svg"
          alt="checkmark"
          className="m-auto h-[100%]"
          width={11}
          height={9}
        />
      </label>
    </>
  );
}
