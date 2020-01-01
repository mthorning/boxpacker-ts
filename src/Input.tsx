import React, { FC, useState } from "react";

const Input: FC<{ submitHandler: (val: string) => void }> = ({
  submitHandler
}) => {
  const [valFromInput, setValFromInput] = useState("");

  function handleKeyDown(e: any) {
    if (e.which === 13) {
      submitHandler(valFromInput);
      setValFromInput("");
    }
  }

  function handleChange(e: any) {
    setValFromInput(e.target.value);
  }

  return (
    <input
      autoFocus
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={valFromInput}
    />
  );
};

export default Input;
