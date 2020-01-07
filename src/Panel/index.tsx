import React, { FC } from "react";
import Input from "../Input";
import EntityList from "../EntityList";
import { EntityParent } from "../types";
import styles from "./Panel.module.css";
import { useParentsEntities, useAppState } from "../AppState";

type PanelProps = {
  title: string;
  parent: EntityParent;
  disabled?: boolean;
};

const Panel: FC<PanelProps> = props => {
  const { disabled, parent, title } = props;
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
      <Input disabled={disabled} submitHandler={addEntity} />
      <EntityList {...{ entities, parentType }} />
    </div>
  );
};

export default Panel;
