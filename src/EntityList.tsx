import React, { FC, useRef, useState, Dispatch, SetStateAction } from "react";
import Input from "./Input";
import { Entity, EntityName, Action } from "./types";

type EditModeType = undefined | EntityName;
interface EntityListItemProps {
  entity: Entity;
  editEntity: (payload: { entity: Entity; newName: EntityName }) => void;
  editMode: EditModeType;
  setEditMode: Dispatch<SetStateAction<EditModeType>>;
}

const EntityListItem: FC<EntityListItemProps> = props => {
  const { entity, editEntity, editMode, setEditMode } = props;
  const doubleClick = useRef(false);

  function handleClick() {
    if (doubleClick.current) {
      setEditMode(entity.name);
    } else {
      doubleClick.current = true;
      setTimeout(() => {
        doubleClick.current = false;
      }, 200);
    }
  }

  function handleEditSubmit(valFromInput: EntityName) {
    editEntity({ entity, newName: valFromInput });
    setEditMode(undefined);
  }

  if (editMode === entity.name)
    return <Input submitHandler={handleEditSubmit} />;

  return <li onClick={handleClick}>{entity.name}</li>;
};

type EntityListProps = {
  entities: Entity[];
  dispatch: (a: Action) => void;
};

const EntityList: FC<EntityListProps> = ({ entities, dispatch }) => {
  const [editMode, setEditMode] = useState<EditModeType>(undefined);

  function editEntity(payload: { entity: Entity; newName: EntityName }) {
    dispatch({ type: "edit", payload });
  }
  return (
    <ul>
      {entities.map(entity => (
        <EntityListItem
          {...{ key: entity.name, entity, editEntity, editMode, setEditMode }}
        />
      ))}
    </ul>
  );
};

export default EntityList;
