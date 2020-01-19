import React, { FC, useState, useRef, useEffect } from "react";
import styles from "./Input.module.css";

type InputProps = {
  submitHandler: (val: string, callback: () => void) => void;
  handleInputChange?: (val: string) => void;
  initialInputVal?: string;
};

const Input: FC<InputProps> = ({
  submitHandler,
  initialInputVal = "",
  handleInputChange = () => {}
}) => {
  const [valFromInput, setValFromInput] = useState(initialInputVal);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.which === 13 && valFromInput) {
      submitHandler(valFromInput.trim(), () => setValFromInput(""));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValFromInput(e.target.value);
    handleInputChange(e.target.value);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (initialInputVal) {
      inputRef.current!.select();
    }
  }, [initialInputVal]);

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={valFromInput}
      />
      {valFromInput && (
        <span onClick={() => setValFromInput("")} className={styles.clear} />
      )}
    </div>
  );
};

export default Input;
