import { useEffect, useCallback, RefObject } from "react";

export function useDoubleClick(onSingle: () => void, onDouble: () => void) {
  // const doubleClick = useRef(false);
  // const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  let doubleClick = false;
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;
  function handleClick(e: any) {
    if (doubleClick) {
      console.log("double click");
      clearTimeout(clickTimeout!);
      //setTimeout(() => onDouble());
      onDouble();
    } else {
      doubleClick = true;
      clickTimeout = setTimeout(() => {
        console.log("single click");
        clearTimeout(clickTimeout!);
        doubleClick = false;
        onSingle();
      }, 200);
    }
  }

  return handleClick;
}

interface Contains {
  contains: (tgt: Node) => boolean;
}
export function useOutsideClick<T extends Contains>(
  wrapperRef: RefObject<T>,
  onClick: (clickedFromOutside: boolean) => void
) {
  const handleDocumentClick = useCallback(
    (e: any) => {
      onClick(!wrapperRef.current!.contains(e.target));
    },
    [wrapperRef, onClick]
  );
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return wrapperRef;
}
