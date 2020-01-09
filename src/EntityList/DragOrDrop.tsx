import React, { FC, MouseEvent } from "react";
import { ParentType, Entity } from "../types";
import { useAppState } from "../AppState";

type ClickHandler = (e: MouseEvent) => void;

interface ParagraphProps {
  onClick: ClickHandler;
  className: string;
  entity: Entity;
}

const Drag: FC<ParagraphProps> = ({ entity, ...rest }) => {
  const [, dispatch] = useAppState();

  function onDragStart(e: React.DragEvent) {
    //dispatch({
    //  type: "SET_SELECTED_MODE",
    //  payload: { id: entity.id, parentType: entity.parent.parentType }
    //});
    e.dataTransfer.setData("itemId", entity.id);
  }
  return (
    <p draggable {...{ ...rest, onDragStart }}>
      {entity.name}
    </p>
  );
};

const Drop: FC<ParagraphProps> = ({ entity, ...rest }) => {
  const [, dispatch] = useAppState();

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    dispatch({
      type: "MOVE_ITEM",
      payload: { boxId: entity.id, itemId }
    });
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  return <p {...{ ...rest, onDragOver, onDrop }}>{entity.name}</p>;
};

interface DragOrDropProps {
  selectedClass: string;
  handleClick: ClickHandler;
  entity: Entity;
}

const DragOrDrop: FC<DragOrDropProps> = props => {
  const { selectedClass: className, handleClick: onClick, entity } = props;
  switch (entity.parent.parentType) {
    case ParentType.Box:
      return <Drag {...{ className, onClick, entity }} />;
    case ParentType.Page:
      return <Drop {...{ className, onClick, entity }} />;
    default:
      return <p {...{ className, onClick, entity }}>{entity.name}</p>;
  }
};

export default DragOrDrop;
