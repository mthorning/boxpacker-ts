import React, { FC, useState, useRef, useEffect } from "react";
import "./Input.css";

type InputProps = {
  submitHandler: (val: string) => void;
  initialInputVal?: string;
};

const Input: FC<InputProps> = ({ submitHandler, initialInputVal = "" }) => {
  const [valFromInput, setValFromInput] = useState(initialInputVal);

  function handleKeyDown(e: any) {
    if (e.which === 13) {
      submitHandler(valFromInput);
      setValFromInput("");
    }
  }

  function handleChange(e: any) {
    setValFromInput(e.target.value);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (initialInputVal) {
      inputRef.current!.select();
    }
  }, [initialInputVal]);

  return (
    <input
      ref={inputRef}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={valFromInput}
    />
  );
};

export default Input;
