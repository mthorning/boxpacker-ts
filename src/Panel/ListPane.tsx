import React, { FC, useState } from "react";
import Input from "../Input";
import EntityList from "../EntityList";
import { EntityParent, ParentType, Entity } from "../types";
import { useParentsEntities, useAppState } from "../AppState";

const ListPane: FC<{ parent: EntityParent }> = props => {
  const { parent } = props;
  const { parentType } = parent;
  const [, dispatch] = useAppState();
  const [inputVal, setInputVal] = useState("");
  const handleInputChange = (val: string) => setInputVal(val);

  const entities = useParentsEntities(parent, inputVal);

  function addEntity(name: string, clearInput: () => void) {
    const payload = { name, parent };
    dispatch({ type: "ADD_ENTITY", payload });
    clearInput();
    setInputVal("");
  }

  return (
    <Component {...{ addEntity, handleInputChange, entities, parentType }} />
  );
};

type ComponentProps = {
  addEntity: (name: string, clearInput: () => void) => void;
  handleInputChange: (val: string) => void;
  entities: Entity[];
  parentType: ParentType;
};

export const Component: FC<ComponentProps> = ({
  addEntity,
  handleInputChange,
  entities,
  parentType
}) => (
  <>
    <Input submitHandler={addEntity} handleInputChange={handleInputChange} />
    <EntityList {...{ entities, parentType }} />
  </>
);

export default ListPane;
