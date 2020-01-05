import React, { FC } from "react";
import Panel from "../Panel";
import styles from "./App.module.css";
import { EntityParent } from "../types";
import { useSelectedEntity } from "../AppState";

const App: FC = () => {
  const selectedBox = useSelectedEntity(EntityParent.Page);
  let noBox = "No Box Selected";
  let itemsTitle = selectedBox ? selectedBox.name : noBox;
  return (
    <div className={styles.app}>
      <Panel title="Boxes" parentType={EntityParent.Page} />
      <Panel title={itemsTitle} parentType={EntityParent.Box} />
    </div>
  );
};

export default App;
