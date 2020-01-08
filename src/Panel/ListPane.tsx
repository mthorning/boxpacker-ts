import React, { FC } from "react";
import Input from "../Input";
import EntityList from "../EntityList";
import { EntityParent } from "../types";
import { useParentsEntities, useAppState } from "../AppState";

const ListPane: FC<{ parent: EntityParent }> = props => {
  const { parent } = props;
  const { parentType } = parent;
  const [, dispatch] = useAppState();

  function addEntity(name: string) {
    const payload = { name, parent };
    dispatch({ type: "ADD_ENTITY", payload });
  }

  const entities = useParentsEntities(parent);

  return (
    <>
      <Input submitHandler={addEntity} />
      <EntityList {...{ entities, parentType }} />
    </>
  );
};

export default ListPane;
