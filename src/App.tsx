import React, { useReducer } from "react";
import Panel from "./Panel";
import { State, Action } from "./types";
import "./App.css";

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        entities: [...state.entities, action.payload]
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
    <>
      <Panel state={state} dispatch={dispatch} />
    </>
  );
};

export default App;
