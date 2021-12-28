import React, { Key } from "react";

import {
  ImageColumn as ImageColumnData,
  ParagraphColumn as ParagraphColumnData,
  DividerColumn as DividerColumnData,
  CardColumn as CardColumnData
} from "../../page-data";

import { Row, Column } from "../grid";
import ImageColumn from "../columns/image-column";
import ParagraphColumn from "../columns/paragraph-column";
import CardColumn from "../columns/card-column";
import * as styles from "./column-section.module.scss";

export function renderColumn(
  column:
    | ImageColumnData
    | ParagraphColumnData
    | DividerColumnData
    | CardColumnData,
  key: Key,
  numberColumns: number,
  backgroundColor?: string
) {
  switch (column.type) {
    case "image":
      return (
        <ImageColumn
          columnData={column}
          columnWidth={(12 / numberColumns) as any}
          key={key}
        />
      );
    case "paragraph":
      return (
        <ParagraphColumn
          columnData={column}
          columnWidth={(12 / numberColumns) as any}
          key={key}
        />
      );
    case "divider":
      return (
        <Column sm={12} md={12} lg={12} key={key}>
          <hr
            className={`${styles.divider} ${
              backgroundColor ? styles.inverted : null
            }`}
          />
        </Column>
      );
    case "card":
      return (
        <CardColumn columnData={column} columnWidth={12} key={key}>
          <Row>
            {column.columns?.map((cardColumn, index) =>
              renderColumn(cardColumn, index, column.numberColumns, "#fff")
            )}
          </Row>
        </CardColumn>
      );
    default:
      break;
  }
}
