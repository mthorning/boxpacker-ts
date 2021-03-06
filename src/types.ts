export type EntityID = string;
export enum ParentType {
  Page,
  Box,
  Item
}
export type EntityParent = {
  parentType: ParentType;
  id?: EntityID | null;
};
export type Entity = {
  id: EntityID;
  name: string;
  parent: EntityParent;
};

export type SelectedEntity = EntityID | null;

export interface AddAction {
  type: "ADD_ENTITY";
  payload: { name: string; parent: { parentType: ParentType } };
}

export interface EditAction {
  type: "EDIT_ENTITY";
  payload: { id: EntityID; newName: string };
}

export interface SetMode {
  type: "SET_SELECTED_MODE" | "SET_EDIT_MODE";
  payload: {
    id: SelectedEntity;
    parentType: ParentType;
  };
}

export interface MoveItem {
  type: "MOVE_ITEM";
  payload: {
    boxId: EntityID;
    itemId: EntityID;
  };
}

export type Action = AddAction | EditAction | SetMode | MoveItem;

export type AppState = {
  entities: Entity[];
  selectedMode: SelectedEntity[];
  editMode: boolean[];
};
