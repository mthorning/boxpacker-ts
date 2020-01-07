import React, { FC, useState, useRef, useEffect } from "react";
import "./Input.css";

type InputProps = {
  submitHandler: (val: string) => void;
  initialInputVal?: string;
  disabled?: boolean;
};

const Input: FC<InputProps> = ({
  disabled,
  submitHandler,
  initialInputVal = ""
}) => {
  const [valFromInput, setValFromInput] = useState(initialInputVal);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.which === 13 && valFromInput) {
      submitHandler(valFromInput.trim());
      setValFromInput("");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
      disabled={disabled}
      ref={inputRef}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={valFromInput}
    />
  );
};

export default Input;
