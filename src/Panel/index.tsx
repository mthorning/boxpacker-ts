import React, { FC, useState, useEffect } from "react";
import { EntityParent } from "../types";
import ListPane from "./ListPane";
import InfoPane from "./InfoPane";
import styles from "./Panel.module.css";

type PanelProps = {
  panelType: PanelType;
  parent: EntityParent;
  hide?: boolean | undefined;
};

export enum PanelType {
  List,
  Info
}

const Panel: FC<PanelProps> = props => {
  const { panelType, hide } = props;
  const [fade, setFade] = useState("");
  const [display, setDisplay] = useState("");
  useEffect(() => {
    setFade(hide ? styles.fadeOut : styles.fadeIn);
    setTimeout(() => setDisplay(hide ? styles.hide : styles.show), 300);
  }, [hide]);
  return (
    <div className={`${styles.panel} ${fade} ${display}`}>
      {panelType === PanelType.List && <ListPane {...props} />}
      {panelType === PanelType.Info && <InfoPane {...props} />}
    </div>
  );
};

export default Panel;
