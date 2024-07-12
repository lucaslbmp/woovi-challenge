import { InputMask } from "primereact/inputmask";
import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask?: string;
}

export default function InputField(props: InputFieldProps) {
  const {label, mask, ...inputProps} = props;
  return (
    <div className={"relative" + " " + props.className}>
      <label className="border-secondary bg-background text-sm bottom-0 absolute top-[-0.5rem] ml-5 h-fit px-1">
        {props.label}
      </label>
      {props.mask ? (
        <InputMask mask={mask} placeholder={props.placeholder} className="border-secondary border-2 rounded-md p-5 text-lg w-full"/>
      ) : (
        <input
          {...props}
          className="border-secondary border-2 rounded-md p-5 text-lg w-full"
        />
      )}
    </div>
  );
}
