import React, {
  FC,
  useMemo,
  useContext,
  useReducer,
  createContext
} from "react";
import {
  AppState,
  Entity,
  Action,
  EntityID,
  ParentType,
  EntityParent
} from "./types";
import { uuid } from "uuidv4";

function getNewMode<T>(mode: T[], parentType: ParentType, newValue: T): T[] {
  const newMode = [...mode];
  newMode[parentType] = newValue;
  return newMode;
}

function getUniqueName(
  currentName: string,
  entities: Entity[],
  parentId: EntityID
): string {
  console.log(entities);
  const sameNames = entities.filter(
    e => e.parent.id === parentId && e.name === currentName
  );
  if (!!sameNames.length) {
    return getUniqueName(
      currentName + `(${sameNames.length})`,
      entities,
      parentId
    );
  }
  return currentName;
}

export function reducer(state: AppState, action: Action): AppState {
  console.log("ACTION = ", action.type, action.payload);
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
      const isSameEntity = id === state.selectedMode[parentType];
      const selectedMode = getNewMode(
        state.selectedMode,
        parentType,
        isSameEntity ? null : id
      );
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
    case "MOVE_ITEM": {
      const { itemId, boxId } = action.payload;
      const index = state.entities.findIndex(entity => itemId === entity.id);
      const entity = state.entities[index];
      const selectedMode = getNewMode(
        state.selectedMode,
        ParentType.Page,
        boxId
      );

      const newEntity: Entity = {
        ...entity,
        name: getUniqueName(entity.name, state.entities, boxId),
        parent: { ...entity.parent, id: boxId }
      };

      return {
        ...state,
        entities: [
          ...state.entities.slice(0, index),
          newEntity,
          ...state.entities.slice(index + 1)
        ],
        selectedMode
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

function filterByEntity(entities: Entity[], parent: EntityParent): Entity[] {
  switch (parent.parentType) {
    case ParentType.Page:
      return entities.filter(
        entity => entity.parent.parentType === parent.parentType
      );
    case ParentType.Box:
      if (parent.id) {
        return entities.filter(entity => entity.parent.id === parent.id);
      }
      return [];
    default:
      return [];
  }
}

export const useParentsEntities = (
  parent: EntityParent,
  nameFilter: string
) => {
  const [{ entities }] = useContext(AppStateContext);
  return useMemo(() => {
    return filterByEntity(entities, parent).filter(e =>
      e.name.includes(nameFilter)
    );
  }, [nameFilter, entities, parent]);
};

export const useSelectedEntity = (parent: ParentType) => {
  const [state] = useContext(AppStateContext);
  const selectedId = state.selectedMode[parent];
  if (!selectedId) return null;
  return state.entities.find(entity => entity.id === selectedId);
};

export const useAssertEditMode = (id: EntityID, parent: ParentType) => {
  const [{ editMode, selectedMode }] = useContext(AppStateContext);
  return editMode[parent] && selectedMode[parent] === id;
};
