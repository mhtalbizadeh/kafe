import React from "react";
import { propsButton } from "./button.interfce";
import Loader from "../loader";
import "./sass/_button.scss";
const Button: React.FC<propsButton> = ({
  children,
  width,
  heigh,
  loader,
    type,
  fonsize,
  onClick,
  disable ,
  
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loader ? true : false}
      style={{ width: width, height: heigh, fontSize: fonsize }}
      className={disable ? "d-none" : "component-button"}
    >
      {loader ? <Loader /> : children}
    </button>
  );
};

export default Button;
