import React from "react";
import { propsInput } from "./input.interface";
import "./sass/_input.scss";
const Input: React.FC<propsInput> = ({
  onChange,
  placeholder,
  width,
  height,
  type,
  id,
  textAlign,
  className,
  value,
  disabel,
}) => {
  return (
    <input
      disabled={disabel}
      value={value}
      id={id}
      type={type}
      className={`component-input ${className}`}
      style={{ width: width, height: height, textAlign: textAlign }}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
