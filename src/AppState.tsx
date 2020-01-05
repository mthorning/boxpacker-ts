import React, { FC, useContext, useReducer, createContext } from "react";
import { AppState, Entity, Action, EntityID, EntityParent } from "./types";
import { uuid } from "uuidv4";

function getNewMode<T>(mode: T[], parentType: EntityParent, newValue: T): T[] {
  const newMode = [...mode];
  newMode[parentType] = newValue;
  return newMode;
}
export function reducer(state: AppState, action: Action): AppState {
  console.log("ACTION = ", action.type);
  switch (action.type) {
    case "ADD_ENTITY": {
      return {
        ...state,
        entities: [
          ...state.entities,
          { id: uuid() as EntityID, ...action.payload }
        ]
      };
    }
    case "EDIT_ENTITY": {
      const { id, newName: name } = action.payload;
      const index = state.entities.findIndex(entity => id === entity.id);
      const entity = state.entities[index];
      const editMode = getNewMode(
        state.editMode,
        entity.parent.parentType,
        false
      );
      const newEntity: Entity = { ...entity, name };
      return {
        ...state,
        entities: [
          ...state.entities.slice(0, index),
          newEntity,
          ...state.entities.slice(index + 1)
        ],
        editMode
      };
    }
    case "SET_SELECTED_MODE": {
      const { parentType, id } = action.payload;
      const selectedMode = getNewMode(state.selectedMode, parentType, id);
      const editMode = getNewMode(state.editMode, parentType, false);
      return {
        ...state,
        selectedMode,
        editMode
      };
    }
    case "SET_EDIT_MODE": {
      const { parentType, id } = action.payload;
      const selectedMode = getNewMode(state.selectedMode, parentType, id);
      const editMode = getNewMode(state.editMode, parentType, true);
      return {
        ...state,
        selectedMode,
        editMode
      };
    }
    case "UNSET_SELECTED_MODE": {
      const selectedMode = getNewMode(state.selectedMode, action.payload, null);
      const editMode = getNewMode(state.editMode, action.payload, false);
      return {
        ...state,
        selectedMode,
        editMode
      };
    }
    case "UNSET_EDIT_MODE": {
      const editMode = getNewMode(state.editMode, action.payload, false);
      return {
        ...state,
        editMode
      };
    }
    default:
      return state;
  }
}

type ContextProps = [AppState, (a: Action) => void];
const initialState = {
  entities: [],
  selectedMode: [null, null],
  editMode: [false, false]
};
const AppStateContext = createContext<ContextProps>([initialState, () => {}]);

export const StateProvider: FC = ({ children }) => {
  const state = useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

export const useEntity = (id: EntityID) => {
  const [state] = useContext(AppStateContext);
  return state.entities.find(entity => entity.id === id);
};

export const useSelectedEntity = (parent: EntityParent) => {
  const [state] = useContext(AppStateContext);
  const selectedId = state.selectedMode[parent];
  if (!selectedId) return null;
  return state.entities.find(entity => entity.id === selectedId);
};

export const useAssertEditMode = (id: EntityID, parent: EntityParent) => {
  const [{ editMode, selectedMode }] = useContext(AppStateContext);
  return editMode[parent] && selectedMode[parent] === id;
};
