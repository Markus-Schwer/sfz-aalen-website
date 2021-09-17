import React, { FunctionComponent, Key } from "react";

import {
  ColumnSection as ColumnSectionData,
  ImageColumn as ImageColumnData,
  ParagraphColumn as ParagraphColumnData,
  DividerColumn as DividerColumnData,
  CardColumn as CardColumnData,
} from "../../../gatsby-node";

import { Row, Column } from "../grid";
import FullWidthSection from "../full-width-section";
import ConditionalWrapper from "../conditional-wrapper";
import ImageColumn from "../columns/image-column";
import ParagraphColumn from "../columns/paragraph-column";
import CardColumn from "../columns/card-column";

import * as styles from "./column-section.module.scss";
import * as layoutStyles from "../layout.module.scss";

function renderColumn(
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

type ColumnSectionProps = {
  data: ColumnSectionData;
};

const ColumnSection: FunctionComponent<ColumnSectionProps> = ({ data }) => {
  return (
    <ConditionalWrapper
      condition={!!data.backgroundColor}
      wrapper={(children) => (
        <FullWidthSection style={{ backgroundColor: data.backgroundColor }}>
          {children}
        </FullWidthSection>
      )}
    >
      <section style={{ color: data.textColor }}>
        {data.header && (
          <>
            {data.header.sectionId && (
              <a
                className={layoutStyles.sectionAnchor}
                id={data.header.sectionId}
              ></a>
            )}
            <h1 style={{ color: data.textColor }}>{data.header.mainHeader}</h1>
            <h2 style={{ color: data.textColor }}>{data.header.subHeader}</h2>
            {data.header.divider ? (
              <hr className={data.backgroundColor ? styles.inverted : null} />
            ) : null}
          </>
        )}
        <Row>
          {data.columns?.map((column, index) =>
            renderColumn(
              column,
              index,
              data.numberColumns,
              data.backgroundColor
            )
          )}
        </Row>
      </section>
    </ConditionalWrapper>
  );
};

export default ColumnSection;
