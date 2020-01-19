import React from "react";
import Input from "./";

export default { title: "Input" };

export const basic = () => {
  return (
    <div
      style={{
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
