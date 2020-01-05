import React, { FC } from "react";
import Panel from "../Panel";
import styles from "./App.module.css";
import { ParentType } from "../types";
import { useSelectedEntity } from "../AppState";

const App: FC = () => {
  const selectedBox = useSelectedEntity(ParentType.Page);
  const itemParent = { parentType: ParentType.Box, id: selectedBox?.id };

  const noBox = "No Box Selected";
  const itemsTitle = selectedBox ? selectedBox.name : noBox;
  return (
    <div className={styles.app}>
      <Panel title="Boxes" parent={{ parentType: ParentType.Page }} />
      <Panel title={itemsTitle} parent={itemParent} />
    </div>
  );
};

export default App;
