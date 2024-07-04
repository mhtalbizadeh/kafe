import React, { useState } from "react";
import { PropsLayout } from "./layout.interface";
import "./layout.scss";
import { FaArrowUp } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdViewCompact } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { FaSquarePollVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Layout: React.FC<PropsLayout> = ({ children }) => {
  const [activeFooter, setActiveFooter] = useState<boolean>(true);
  return (
    <>
      <div
        className="layout font-serif"
        onClick={() => {
          setActiveFooter(true);
        }}
      >
        <div className="layout_chldren">{children}</div>
        <div
          className="layout_button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveFooter(false);
          }}
        >
          <FaArrowUp />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={activeFooter ? "layout_footer-unactive" : "layout_footer"}
        >
          <div className="layout_footer_top">
            <div
              className="layout_footer_top_button"
              onClick={() => {
                setActiveFooter(true);
              }}
            >
              <MdKeyboardDoubleArrowDown />
            </div>
          </div>
          <div className="layout_footer_bottom">
            <Link to={"/order"} className="layout_footer_bottom_button">
              گزارش گیری
              <FaSquarePollVertical />
            </Link>
            <Link to={"/"} className="layout_footer_bottom_button">
              نمایش
              <MdViewCompact />
            </Link>
            <Link to={"/menu"} className="layout_footer_bottom_button">
              اضافه کردن
              <MdEditNote />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
