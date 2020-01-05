export type EntityID = string;
export enum EntityParent {
  Page,
  Box
}
export type Entity = {
  id: EntityID;
  name: string;
  parent: { parentType: EntityParent; id?: EntityID };
};

export type SelectedEntity = EntityID | null;

export interface AddAction {
  type: "ADD_ENTITY";
  payload: { name: string; parent: { parentType: EntityParent } };
}

export interface EditAction {
  type: "EDIT_ENTITY";
  payload: { id: EntityID; newName: string };
}

export interface SetMode {
  type: "SET_SELECTED_MODE" | "SET_EDIT_MODE";
  payload: {
    id: SelectedEntity;
    parentType: EntityParent;
  };
}

export interface UnsetMode {
  type: "UNSET_SELECTED_MODE" | "UNSET_EDIT_MODE";
  payload: EntityParent;
}

export type Action = AddAction | EditAction | SetMode | UnsetMode;

export type AppState = {
  entities: Entity[];
  selectedMode: SelectedEntity[];
  editMode: boolean[];
};
