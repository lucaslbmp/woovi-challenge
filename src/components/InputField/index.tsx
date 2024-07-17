import {
  ErrorMessage,
  Field,
  FieldAttributes,
  FieldHookConfig,
  FieldProps,
  GenericFieldHTMLAttributes,
  useField,
  useFormikContext,
} from "formik";
import MaskedInput, { Mask } from "react-text-mask";

interface InputFieldProps extends FieldAttributes<any> {
  label: string;
  mask?: Mask;
}

export default function InputField(props: InputFieldProps) {

  return (
    <div className={"relative" + " " + props.className}>
      <label className="border-secondary bg-background text-sm bottom-0 absolute top-[-0.5rem] ml-5 h-fit px-1 z-10">
        {props.label}
      </label>
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

        <ErrorMessage
          component="div"
          className="text-red-500 opacity-50 ml-2"
          name={props.name}
        />
      </div>
    </div>
  );
}
