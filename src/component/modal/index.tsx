import React, { useState } from "react";
import { propsModal } from "./modal.interface";
import ClosePic from "../../../assets/images/close.png";
import "./sass/_modal.scss";

const Modal: React.FC<propsModal> = ({
  children,
  showModal,
  setShowModal,
  height,
  width,
  closePic,
  idClose,
  onClick,
  backGroundColor,
  borderRadius,
}) => {
  const [closeModal, setCloseModal] = useState<boolean>(true);
  return (
    <div
      id={idClose ? idClose : "close-modal"}
      className={showModal ? "component-modal-bluescreen" : "d-none"}
      onClick={() => {
        setCloseModal(false);
        setTimeout(() => {
          setCloseModal(true);
          setShowModal(false);
        }, 500);
      }}
    >
      <div
        id="modal-component"
        style={{
          width: width,
          height: height,
          backgroundColor: backGroundColor,
          backgroundImage: backGroundColor ? "none" : "",
          borderRadius: borderRadius,
          padding: backGroundColor ? "0rem" : "",
        }}
        className={closeModal ? "component-modal" : "component-modal-dnone"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {closePic ? (
          <></>
        ) : (
          <img
            src={ClosePic}
            alt="closePic"
            className={"component-modal-close"}
            style={
              backGroundColor ? { marginRight: "3rem", marginTop: "3rem" } : {}
            }
            onClick={() => {
              setCloseModal(false);
              setTimeout(() => {
                setCloseModal(true);
                setShowModal(false);
              }, 500);
            }}
          />
        )}

        <div className="component-modal-child">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
