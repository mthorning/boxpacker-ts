import React from "react";
import Input from "./";

export default { title: "Input" };

export const basic = () => {
  return (
    <div
      style={{
        fontSize: "22.5px",
        padding: "5px",
        height: "500px",
        border: "1px solid red",
        width: "400px"
      }}
    >
      <Input />
    </div>
  );
};
