import { FunctionComponent } from "react";

import styles from "./big-header-section.module.scss";
import { BlockComponentProps, InlineTextarea, BlocksControls } from "react-tinacms-inline";

const BigHeaderSection: FunctionComponent<BlockComponentProps> = ({data, index}) => {
  return (
    <BlocksControls index={index}>
      <h1 className={styles.bigHeader}>
        <InlineTextarea name="headerText">
          {data.headerText}
        </InlineTextarea>
      </h1>
    </BlocksControls>
  );
}

export default BigHeaderSection;
