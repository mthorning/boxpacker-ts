import React, { FC } from "react";
import EntityInput from "../Input";
import EntityList from "../EntityList";
import { Action, AppState, Entity, EntityName } from "../types";
import styles from "./Panel.module.css";

type PanelProps = {
  state: AppState;
  dispatch: (a: Action) => void;
};

const Panel: FC<PanelProps> = props => {
  const { state, dispatch } = props;

  function addEntity(name: EntityName) {
    let payload: Entity = { name, parent: "page" };
    dispatch({ type: "add", payload });
  }
  return (
    <div className={styles.panel}>
      <EntityInput submitHandler={addEntity} />
      <EntityList entities={state.entities} dispatch={dispatch} />
    </div>
  );
};

export default Panel;
