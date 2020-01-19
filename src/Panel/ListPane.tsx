import React, { FC, useState } from "react";
import Input from "../Input";
import EntityList from "../EntityList";
import { EntityParent } from "../types";
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
    <>
      <Input submitHandler={addEntity} handleInputChange={handleInputChange} />
      <EntityList {...{ entities, parentType }} />
    </>
  );
};

export default ListPane;
