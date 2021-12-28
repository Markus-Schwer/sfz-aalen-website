import React, { FunctionComponent } from "react";

import { ColumnSection as ColumnSectionData } from "../../page-data";

import { Row } from "../grid";
import FullWidthSection from "../full-width-section";
import ConditionalWrapper from "../conditional-wrapper";

import * as styles from "./column-section.module.scss";
import * as layoutStyles from "../layout.module.scss";
import { renderColumn } from "./section-utils";

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
