export type EntityName = string;
export type Entity = {
  name: EntityName;
  parent: "page" | EntityName;
};

export interface AddAction {
  type: "add";
  payload: Entity;
}

export interface EditAction {
  type: "edit";
  payload: { entity: Entity; newName: EntityName };
}

export type Action = AddAction | EditAction;

export type AppState = {
  entities: Entity[];
};
