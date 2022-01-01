import React, { FunctionComponent } from "react";
import useDarkMode from "use-dark-mode";

import { ColumnSection as ColumnSectionData } from "../../page-data";
import { calcBrightness, calcDarkModeBackground } from "../../utils";

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
  const darkMode = useDarkMode();

  let backgroundColor = data.backgroundColor;
  let textColor = "var(--text-color)";

  if (backgroundColor) {
    backgroundColor = darkMode.value
      ? calcDarkModeBackground(backgroundColor)
      : backgroundColor;
    textColor =
      calcBrightness(backgroundColor) > 125
        ? "var(--text-color-dark)" // background is bright
        : "var(--text-color-light)"; // background is dark
  }

  return (
    <ConditionalWrapper
      condition={!!backgroundColor}
      wrapper={(children) => (
        <FullWidthSection style={{ backgroundColor: backgroundColor }}>
          {children}
        </FullWidthSection>
      )}
    >
      <section style={{ color: textColor }}>
        {data.header && (
          <>
            {data.header.sectionId && (
              <a
                className={layoutStyles.sectionAnchor}
                id={data.header.sectionId}
              ></a>
            )}
            <h1>{data.header.mainHeader}</h1>
            <h2>{data.header.subHeader}</h2>
            {data.header.divider ? (
              <hr className={backgroundColor ? styles.inverted : null} />
            ) : null}
          </>
        )}
        <Row>
          {data.columns?.map((column, index) =>
            renderColumn(column, index, data.numberColumns, backgroundColor)
          )}
        </Row>
      </section>
    </ConditionalWrapper>
  );
};

export default ColumnSection;
