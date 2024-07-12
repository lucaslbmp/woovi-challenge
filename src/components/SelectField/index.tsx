import { SelectHTMLAttributes } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function SelectField(props: SelectFieldProps) {
  return (
    <div className={"relative " + props.className}>
      <label className="border-secondary bg-background text-sm bottom-0 absolute top-[-0.5rem] ml-5 h-fit px-1 z-10">
        {props.label}
      </label>
      <div className="relative after:content-['▼'] after:absolute after:right-2.5 after:top-[25%]  after:translate-y-1/4 after:pointer-events-none">
        <select
          {...props}
          className="border-secondary border-2 rounded-md p-5 text-lg appearance-none pr-30 w-full"
        >
          {props.children}
        </select>
      </div>
    </div>
  );
}
