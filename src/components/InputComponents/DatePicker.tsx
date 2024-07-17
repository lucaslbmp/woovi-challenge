import React from 'react';
import { useField, FieldHookConfig, FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerFieldProps = FieldHookConfig<Date> & {
  label: string;
}

const DatePickerComponent = ({ field, form, ...props } : FieldProps & DatePickerFieldProps) => {

  return (
    <>
      <DatePicker
        id={field.name}
        className={props.className}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val: Date | null) => {
          form.setFieldValue(field.name, val);
        }}
        dateFormat="MM/y"
      />
    </>
  );
};

export default DatePickerComponent;