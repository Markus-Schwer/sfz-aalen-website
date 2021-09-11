import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { ColumnSection as ColumnSectionData } from "../../../gatsby-node";

import FullWidthSection from "../full-width-section";
import Grid from "../grid";
import ConditionalWrapper from "../conditional-wrapper";

import * as styles from "./column-section.module.scss";

const StyledReactMarkdown = styled(ReactMarkdown).attrs((props: { color: string }) => props)`
  color: ${props => props.color};
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
            <h1 style={{color: data.textColor}}>{data.header.mainHeader}</h1>
            <h2 style={{color: data.textColor}}>{data.header.subHeader}</h2>
            {data.header.divider ? (
              <hr className={data.backgroundColor ? styles.inverted : null} />
            ) : null}
          </>
        )}
        <Grid columns={data.numberColumns} gap={40}>
          {data.columns?.map((column, index) => {
            switch (column.type) {
              case "image":
                if (column.image)
                  return (
                    <div key={index}>
                      <GatsbyImage
                        image={getImage(column.image)!!}
                        alt={column.altText}
                      />
                    </div>
                  );
                else if (column.previewImage)
                  return (
                    <div key={index}>
                      <img
                        className={styles.previewImage}
                        src={column.previewImage}
                        alt={column.altText}
                      />
                    </div>
                  );
                break;
              case "paragraph":
                return (
                  <StyledReactMarkdown color={data.textColor} className={styles.paragraphColumn} key={index}>
                    {column.text}
                  </StyledReactMarkdown>
                );
              case "divider":
                return (
                  <hr
                    className={`${styles.divider} ${
                      data.backgroundColor ? styles.inverted : null
                    }`}
                    key={index}
                  />
                );
              default:
                break;
            }
          })}
        </Grid>
      </section>
    </ConditionalWrapper>
  );
};

export default ColumnSection;
