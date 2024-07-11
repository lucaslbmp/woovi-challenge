import Image from "next/image";
import { getRandomInt } from "../../app/utils/functions";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox(props: CheckboxProps) {
  const id = getRandomInt(1, 1000000).toString();

  return (
    <>
      <input
        {...props}
        type="radio"
        //name={name}
        id={id}
        //disabled={disabled}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        className={
          "w-[1.625rem] h-[1.625rem] border-secondary border-2 rounded-full peer-checked:bg-highlight cursor-pointer select-none float-right " + " "
          + props.className
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
