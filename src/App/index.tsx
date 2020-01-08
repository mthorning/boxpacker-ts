import React, { FC } from "react";
import Panel, { PanelType } from "../Panel";
import styles from "./App.module.css";
import { ParentType } from "../types";
import { useSelectedEntity } from "../AppState";

const App: FC = () => {
  const selectedBox = useSelectedEntity(ParentType.Page);
  const selectedItem = useSelectedEntity(ParentType.Box);
  const itemParent = { parentType: ParentType.Box, id: selectedBox?.id };
  const infoParent = { parentType: ParentType.Item, id: selectedItem?.id };

  return (
    <div className={styles.app}>
      <Panel
        panelType={PanelType.List}
        parent={{ parentType: ParentType.Page }}
      />
      <Panel
        panelType={PanelType.List}
        hide={!selectedBox}
        parent={itemParent}
      />
      <Panel
        panelType={PanelType.Info}
        hide={!selectedItem}
        parent={infoParent}
      />
    </div>
  );
};

export default App;
