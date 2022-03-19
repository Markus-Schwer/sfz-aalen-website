import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';

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
      <ReactMarkdown className={styles.paragraphColumn} rehypePlugins={[rehypeRaw, rehypeSlug] as any[]} skipHtml={false} allowElement={() => true}>
        {columnData.text}
      </ReactMarkdown>
    </Column>
  );
};

export default ParagraphColumn;
