import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "bg-primary text-textTerciary rounded-md py-2 px-5 text-lg" +
        " " +
        props.className
      }
    >
      {props.children}
    </button>
  );
}
