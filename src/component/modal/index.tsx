import React, { useState } from "react";
import { propsModal } from "./modal.interface";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./sass/_modal.scss";

const Modal: React.FC<propsModal> = ({
  children,
  showModal,
  setShowModal,
  height,
  width,
  idClose,
}) => {
  const [closeModal, setCloseModal] = useState<boolean>(true);
  return (
    <div
      id={idClose ? idClose : "close-modal"}
      className={showModal ? "component-modal-bluescreen " : "d-none"}
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
        }}
        className={closeModal ? "component-modal" : "component-modal-dnone"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IoIosCloseCircleOutline
          className={"component-modal-close"}
          onClick={() => {
            setCloseModal(false);
            setTimeout(() => {
              setCloseModal(true);
              setShowModal(false);
            }, 500);
          }}
        />
        <div className="component-modal-child">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
