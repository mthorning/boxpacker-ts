import React, { FC, useState } from "react";
import { Action, Entity, State } from "./types";

const EntityInput: FC<{ addEntity: (val: string) => void }> = ({
  addEntity
}) => {
  const [valFromInput, setValFromInput] = useState("");
  const handleKeyDown = (e: any) => {
    if (e.which === 13) {
      console.log("ye");
      addEntity(valFromInput);
      setValFromInput("");
    }
  };
  const handleChange = (e: any) => {
    setValFromInput(e.target.value);
  };

  return (
    <input
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={valFromInput}
    />
  );
};

const EntityListItem = (entity: Entity) => (
  <li key={entity.name}>{entity.name}</li>
);
const EntityList: FC<{ entities: Entity[] }> = ({ entities }) => (
  <ul>{entities.map(EntityListItem)}</ul>
);

type PanelProps = {
  state: State;
  dispatch: (action: Action) => void;
};

const Panel: FC<PanelProps> = props => {
  const { state, dispatch } = props;
  const addEntity = (name: string) => {
    dispatch({ type: "add", payload: { name, parent: "page" } });
  };
  return (
    <>
      <EntityInput addEntity={addEntity} />
      <EntityList entities={state.entities} />
    </>
  );
};

export default Panel;
