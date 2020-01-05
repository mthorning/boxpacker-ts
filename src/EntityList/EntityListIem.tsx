import React, { FC } from "react";
import Input from "../Input";
import { Action, Entity, EntityParent } from "../types";
import styles from "./EntityList.module.css";
import { useDoubleClick } from "../hooks";
import { useSelectedEntity, useAssertEditMode } from "../AppState";

interface EntityListItemProps {
  entity: Entity;
  parentType: EntityParent;
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
        <p className={selectedClass} onClick={handleClick}>
          {entity.name}
        </p>
      )}
    </li>
  );
};

export default EntityListItem;
