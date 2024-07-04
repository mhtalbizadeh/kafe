import React from "react";
import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.71)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10.1px)",
          border: "1px solid #ffe002",
          padding: "5px",
          color: "#ffe002",
        }}
      >
        <p>{`${label} : تاریخ`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`}>{` ${entry.value} : جمع`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
