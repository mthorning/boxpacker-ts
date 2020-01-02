import React, { FC, useState } from "react";
import { Entity, EntityName, Action } from "../types";
import EntityListItem from "./EntityListIem";
import styles from "./EntityList.module.css";

export type EditModeType = null | EntityName;

type EntityListProps = {
  entities: Entity[];
  dispatch: (a: Action) => void;
};

const EntityList: FC<EntityListProps> = ({ entities, dispatch }) => {
  const [editMode, setEditMode] = useState<EditModeType>(null);

  function editEntity(payload: { entity: Entity; newName: EntityName }) {
    dispatch({ type: "edit", payload });
  }
  return (
    <ul className={styles.entityList}>
      {entities.map(entity => (
        <EntityListItem
          {...{ key: entity.name, entity, editEntity, editMode, setEditMode }}
        />
      ))}
    </ul>
  );
};

export default EntityList;
