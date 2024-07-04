import React, { useEffect, useRef, useState } from "react";
import { CheckBoxSelectProps } from "./checkBoxSelect.interface";
import "./sass/checkBoxSelect.scss";
import chavronDown from "../../images/chavronDownBlue.svg";
const CheckBoxSelect: React.FC<CheckBoxSelectProps> = ({
  options,
  onChange,
  label,
  width,
  height,
  fontSize,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleCheckboxChange = (value: string) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="checkBoxSelect">
      <button
        className="checkBoxSelect_button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{ width: width, height: height, fontSize: fontSize }}
      >
        {label}
        <img
          src={chavronDown}
          alt="chavronDown"
          style={isOpen ? { rotate: "180deg" } : {}}
        />
      </button>

      <select
        className={
          isOpen ? "checkBoxSelect_dropdown" : "checkBoxSelect_dropdown-show"
        }
        style={{
          width: width,
          fontSize: fontSize,
          height: `${parseInt(height) * options.length}px`,
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className="checkBoxSelect_dropdown_item"
            style={{ height: height, fontSize: fontSize }}
            onClick={() => handleCheckboxChange(option.value)}
          >
            <label>{option.label}</label>
          </option>
        ))}
      </select>
    </div>
  );
};

export default CheckBoxSelect;
