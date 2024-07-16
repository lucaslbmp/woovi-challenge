import { Field, FieldAttributes, GenericFieldHTMLAttributes } from "formik";
import { InputMask } from "primereact/inputmask";

interface InputFieldProps extends FieldAttributes<any> {
  label: string;
  mask?: string;
}

export default function InputField(props: InputFieldProps) {
  const { label, mask, ...inputProps } = props;
  return (
    <div className={"relative" + " " + props.className}>
      <label className="border-secondary bg-background text-sm bottom-0 absolute top-[-0.5rem] ml-5 h-fit px-1 z-10">
        {props.label}
      </label>
      {props.mask ? (
        <InputMask
          mask={mask}
          placeholder={props.placeholder}
          className="border-secondary border-2 rounded-md p-5 text-lg w-full"
        />
      ) : (
        <div
          className={
            props.as === "select"
              ? "relative after:content-['▼'] after:absolute after:right-2.5 after:top-[25%] after:translate-y-1/4 after:pointer-events-none"
              : ""
          }
        >
          <Field
            {...props}
            className="border-secondary border-2 rounded-md p-5 text-lg w-full appearance-none"
          />
        </div>
      )}
    </div>
  );
}
