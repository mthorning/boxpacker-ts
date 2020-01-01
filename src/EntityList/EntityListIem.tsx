import React, {
  FC,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback
} from "react";
import Input from "../Input";
import { Entity, EntityName } from "../types";
import { EditModeType } from "./";

interface EntityListItemProps {
  entity: Entity;
  editEntity: (payload: { entity: Entity; newName: EntityName }) => void;
  editMode: EditModeType;
  setEditMode: Dispatch<SetStateAction<EditModeType>>;
}

const EntityListItem: FC<EntityListItemProps> = props => {
  const { entity, editEntity, editMode, setEditMode } = props;
  const inEditMode = editMode === entity.name;

  const doubleClick = useRef(false);
  function handleClick(e: any) {
    if (doubleClick.current) {
      setTimeout(() => setEditMode(entity.name));
    } else {
      doubleClick.current = true;
      setTimeout(() => {
        doubleClick.current = false;
      }, 200);
    }
  }

  function handleEditSubmit(valFromInput: EntityName) {
    editEntity({ entity, newName: valFromInput });
    setEditMode(null);
  }

  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleDocumentClick = useCallback(
    (e: any) => {
      if (!wrapperRef.current!.contains(e.target)) {
        setEditMode(null);
      }
    },
    [setEditMode]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <div ref={wrapperRef}>
      {inEditMode ? (
        <Input initialInputVal={entity.name} submitHandler={handleEditSubmit} />
      ) : (
        <li onClick={handleClick}>{entity.name}</li>
      )}
    </div>
  );
};

export default EntityListItem;
