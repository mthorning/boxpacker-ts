export type EntityName = string;
export type Entity = {
  name: EntityName;
  parent: "page" | EntityName;
};

export type Action = {
  type: "add";
  payload: Entity;
};

export type State = {
  entities: Entity[];
};
