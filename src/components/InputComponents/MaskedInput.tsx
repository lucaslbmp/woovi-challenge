import { FieldProps } from "formik";
import MaskedInput, { Mask } from "react-text-mask";

const MaskedInputComponent = ({
    field,
    form,
    ...props
  }: FieldProps & React.InputHTMLAttributes<HTMLInputElement> & {mask: Mask, guide: boolean}) => {
    return (
      <>
        <MaskedInput
          {...field}
          {...props}
          mask={props?.mask ?? []}
          guide={props.guide}
        />
      </>
    );
  };

  export default MaskedInputComponent;