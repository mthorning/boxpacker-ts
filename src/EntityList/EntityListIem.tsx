import React, { FC } from "react";
import Input from "../Input";
import { Action, Entity, ParentType } from "../types";
import styles from "./EntityList.module.css";
import { useDoubleClick } from "../hooks";
import { useSelectedEntity, useAssertEditMode } from "../AppState";
import DragOrDrop from "./DragOrDrop";

interface EntityListItemProps {
  entity: Entity;
  parentType: ParentType;
  dispatch: (a: Action) => void;
}

const EntityListItem: FC<EntityListItemProps> = props => {
  const { entity, dispatch, parentType } = props;
  const selectedEntity = useSelectedEntity(parentType);
  const inEditMode = useAssertEditMode(entity.id, parentType);
  const handleClick = useDoubleClick(onSingleClick, onDoubleClick);

  const selectedClass =
    selectedEntity && selectedEntity.id === entity.id ? styles.selected : "";

  function onSingleClick() {
    dispatch({
      type: "SET_SELECTED_MODE",
      payload: { id: entity.id, parentType }
    });
  }

  function onDoubleClick() {
    dispatch({ type: "SET_EDIT_MODE", payload: { parentType, id: entity.id } });
  }

  function handleEditSubmit(valFromInput: string) {
    dispatch({
      type: "EDIT_ENTITY",
      payload: { id: entity.id, newName: valFromInput }
    });
  }

  return (
    <li className={styles.entityItem}>
      {inEditMode ? (
        <Input initialInputVal={entity.name} submitHandler={handleEditSubmit} />
      ) : (
        <DragOrDrop {...{ selectedClass, handleClick, entity }} />
      )}
    </li>
  );
};

export default EntityListItem;
