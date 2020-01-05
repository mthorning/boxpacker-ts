import React, { FC } from "react";
import EntityInput from "../Input";
import EntityList from "../EntityList";
import { EntityParent } from "../types";
import styles from "./Panel.module.css";
import { useParentsEntities, useAppState } from "../AppState";

type PanelProps = {
  title: string;
  parent: EntityParent;
};

const Panel: FC<PanelProps> = props => {
  const { parent, title } = props;
  const { parentType } = parent;
  const [, dispatch] = useAppState();

  function addEntity(name: string) {
    const payload = { name, parent };
    dispatch({ type: "ADD_ENTITY", payload });
  }

  const entities = useParentsEntities(parent);

  return (
    <div className={styles.panel}>
      <h4>{title}</h4>
      <EntityInput submitHandler={addEntity} />
      <EntityList {...{ entities, parentType }} />
    </div>
  );
};

export default Panel;
