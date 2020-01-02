import React, { useReducer } from "react";
import Panel from "../Panel";
import { AppState, Entity, Action } from "../types";
import styles from "./App.module.css";

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "add":
      //FIXME: unique name or ID
      return {
        ...state,
        entities: [...state.entities, action.payload]
      };
    case "edit":
      const { entity, newName } = action.payload;
      const index = state.entities.findIndex(
        ({ name }) => name === entity.name
      );
      let newEntity: Entity = { name: newName, parent: "page" };
      return {
        ...state,
        entities: [
          ...state.entities.slice(0, index),
          newEntity,
          ...state.entities.slice(index + 1)
        ]
      };
    default:
      return state;
  }
}
const App: React.FC = () => {
  const initialState = {
    entities: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className={styles.app}>
      <Panel state={state} dispatch={dispatch} />
      <Panel state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;
