import React, { useEffect, useState } from "react";
import "./scss/_tabsbutton.scss";
import { TabsButtonProps } from "./tabsButton.interface";
const TabsButton: React.FC<TabsButtonProps> = ({
  namsOfButton,
  activeButtons,
  setActiveTabs,
  withOfButton,
}) => {
  const [activeButton, setActiveButton] = useState(
    namsOfButton[activeButtons - 1]
  );
  let marginButton: number = 0;
  let [marginBg, setMarginBg] = useState<string>(
    withOfButton
      ? `${(Number(withOfButton.slice(0, 2)) + 3) * (activeButtons - 1)}px`
      : `${(activeButtons - 1) * 26}px`
  );
  useEffect(() => {
    setActiveButton(namsOfButton[activeButtons - 1]);
    setMarginBg(
      withOfButton
        ? `${(Number(withOfButton.slice(0, 2)) + 3) * (activeButtons - 1)}px`
        : `${(activeButtons - 1) * 26}px`
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeButtons, withOfButton]);

  return (
    <>
      <div className="tabsbutton">
        <div className="tabsbutton-element">
          <span
            style={
              withOfButton
                ? { marginRight: marginBg, width: withOfButton }
                : { marginRight: marginBg }
            }
            className={`tabsbutton-element-active`}
          ></span>
          {namsOfButton.map((value, index) => {
            if (index !== 0) {
              if (withOfButton) {
                marginButton =
                  marginButton + Number(withOfButton.slice(0, 2)) + 3;
              } else {
                marginButton = marginButton + 26;
              }
            }
            return (
              <button
                key={index+10}
                id={value}
                style={
                  withOfButton
                    ? { marginRight: `${marginButton}px`, width: withOfButton }
                    : { marginRight: `${marginButton}px` }
                }
                className={`${
                  activeButton === value
                    ? "tabsbutton-element-button-active"
                    : ""
                } tabsbutton-element-button`}
                onClick={() => {
                  setActiveButton(value);
                  setMarginBg(
                    getComputedStyle(
                      document.getElementById(value) as HTMLElement
                    ).marginRight
                  );
                  setActiveTabs(value);
                }}
              >
                <label
                  className="tabsbutton-element-button-label"
                  style={activeButton === value ? { color: "#004e98" } : {}}
                >
                  {value}
                </label>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TabsButton;
