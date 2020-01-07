import React, { FC } from "react";
import Panel from "../Panel";
import styles from "./App.module.css";
import { ParentType } from "../types";
import { useSelectedEntity } from "../AppState";

const App: FC = () => {
  const selectedBox = useSelectedEntity(ParentType.Page);
  const itemParent = { parentType: ParentType.Box, id: selectedBox?.id };

  let itemsTitle, disabled;
  if (selectedBox && selectedBox.name) {
    itemsTitle = selectedBox.name;
  } else {
    disabled = true;
    itemsTitle = "No Box Selected";
  }
  return (
    <div className={styles.app}>
      <Panel title="Boxes" parent={{ parentType: ParentType.Page }} />
      <Panel disabled={disabled} title={itemsTitle} parent={itemParent} />
    </div>
  );
};

export default App;
