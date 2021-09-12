import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { ColumnSection as ColumnSectionData } from "../../../gatsby-node";

import FullWidthSection from "../full-width-section";
import { Row, Column } from "../grid";
import ConditionalWrapper from "../conditional-wrapper";

import * as styles from "./column-section.module.scss";
import * as layoutStyles from "../layout.module.scss";

const StyledReactMarkdown = styled(ReactMarkdown).attrs(
  (props: { color: string }) => props
)`
  color: ${(props) => props.color};
`;

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
      <section>
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
          {data.columns?.map((column, index) => {
            switch (column.type) {
              case "image":
                if (column.image)
                  return (
                    <Column
                      sm={12}
                      md={12}
                      lg={(12 / data.numberColumns) as any}
                      key={index}
                    >
                      <GatsbyImage
                        image={getImage(column.image)!!}
                        alt={column.altText}
                      />
                    </Column>
                  );
                else if (column.previewImage)
                  return (
                    <Column
                      sm={12}
                      md={12}
                      lg={(12 / data.numberColumns) as any}
                      key={index}
                    >
                      <img
                        className={styles.previewImage}
                        src={column.previewImage}
                        alt={column.altText}
                      />
                    </Column>
                  );
                break;
              case "paragraph":
                return (
                  <Column
                    sm={12}
                    md={12}
                    lg={(12 / data.numberColumns) as any}
                    key={index}
                  >
                    <StyledReactMarkdown
                      color={data.textColor}
                      className={styles.paragraphColumn}
                    >
                      {column.text}
                    </StyledReactMarkdown>
                  </Column>
                );
              case "divider":
                return (
                  <Column sm={12} md={12} lg={12} key={index}>
                    <hr
                      className={`${styles.divider} ${
                        data.backgroundColor ? styles.inverted : null
                      }`}
                    />
                  </Column>
                );
              default:
                break;
            }
          })}
        </Row>
      </section>
    </ConditionalWrapper>
  );
};

export default ColumnSection;
