import React, { FC } from "react";
import EntityInput from "./Input";
import EntityList from "./EntityList";
import { Action, AppState, Entity, EntityName } from "./types";

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
    <>
      <EntityInput submitHandler={addEntity} />
      <EntityList entities={state.entities} dispatch={dispatch} />
    </>
  );
};

export default Panel;
