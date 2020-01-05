import React, { FC, useRef } from "react";
import { Entity, EntityParent } from "../types";
import EntityListItem from "./EntityListIem";
import styles from "./EntityList.module.css";
import { useAppState } from "../AppState";
import { useOutsideClick } from "../hooks";

type EntityListProps = {
  entities: Entity[];
  parentType: EntityParent;
};

const EntityList: FC<EntityListProps> = ({ entities, parentType }) => {
  const [, dispatch] = useAppState();

  const wrapperRef = useRef<HTMLUListElement>(null);
  // useOutsideClick(wrapperRef, clickedFromOutside => {
  //   if (clickedFromOutside) {
  //     console.log("outside click");
  //     dispatch({
  //       type: "UNSET_EDIT_MODE",
  //       payload: parentType
  //     });
  //   }
  // });

  return (
    <ul ref={wrapperRef} className={styles.entityList}>
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
