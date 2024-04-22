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
  className ,
}) => {
  return (
    <input
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
