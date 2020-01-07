import { MouseEvent } from "react";

export function useDoubleClick(onSingle: () => void, onDouble: () => void) {
  let doubleClick = false;
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;
  function handleClick(e: MouseEvent) {
    if (doubleClick) {
      clearTimeout(clickTimeout!);
      onDouble();
    } else {
      doubleClick = true;
      clickTimeout = setTimeout(() => {
        clearTimeout(clickTimeout!);
        doubleClick = false;
        onSingle();
      }, 200);
    }
  }

  return handleClick;
}
