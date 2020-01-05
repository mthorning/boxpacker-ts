import React, { FC } from "react";
import { Entity, ParentType } from "../types";
import EntityListItem from "./EntityListIem";
import styles from "./EntityList.module.css";
import { useAppState } from "../AppState";

type EntityListProps = {
  entities: Entity[];
  parentType: ParentType;
};

const EntityList: FC<EntityListProps> = ({ entities, parentType }) => {
  const [, dispatch] = useAppState();

  return (
    <ul className={styles.entityList}>
      {entities.map(entity => (
        <EntityListItem
          {...{
            key: entity.name,
            entity,
            parentType,
            dispatch
          }}
        />
      ))}
    </ul>
  );
};

export default EntityList;
