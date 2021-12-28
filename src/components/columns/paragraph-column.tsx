import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";

import { ParagraphColumn as ParagraphColumnData } from "../../page-data";

import { Column, GridSizes } from "../grid";

import * as styles from "./paragraph-column.module.scss";

type ParagraphColumnProps = {
  columnData: ParagraphColumnData;
  columnWidth: GridSizes;
};

const ParagraphColumn: FunctionComponent<ParagraphColumnProps> = ({ columnData, columnWidth }) => {
  return (
    <Column
      sm={12}
      md={12}
      lg={columnWidth}
    >
      <ReactMarkdown className={styles.paragraphColumn}>
        {columnData.text}
      </ReactMarkdown>
    </Column>
  );
};

export default ParagraphColumn;
