import React, { FC } from "react";
import EntityInput from "../Input";
import EntityList from "../EntityList";
import { EntityParent } from "../types";
import styles from "./Panel.module.css";
import { useAppState } from "../AppState";

type PanelProps = {
  title: string;
  parentType: EntityParent;
};

const Panel: FC<PanelProps> = props => {
  const { parentType, title } = props;
  const [state, dispatch] = useAppState();

  function addEntity(name: string) {
    const payload = { name, parent: { parentType } };
    dispatch({ type: "ADD_ENTITY", payload });
  }

  const entities = state.entities.filter(
    entity => entity.parent.parentType === parentType
  );

  return (
    <div className={styles.panel}>
      <h4>{title}</h4>
      <EntityInput submitHandler={addEntity} />
      <EntityList {...{ entities, parentType }} />
    </div>
  );
};

export default Panel;
