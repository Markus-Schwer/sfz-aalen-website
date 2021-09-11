import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import { ColumnSection as ColumnSectionData } from "../../../gatsby-node";


import FullWidthSection from "../full-width-section";
import Grid from "../grid";
import ConditionalWrapper from "../conditional-wrapper";

import * as styles from "./column-section.module.scss";

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
            <h1>{data.header.mainHeader}</h1>
            <h2>{data.header.subHeader}</h2>
            {data.header.divider ? (
              <hr className={data.backgroundColor ? styles.inverted : null} />
            ) : null}
          </>
        )}
        <Grid columns={data.numberColumns} gap={40}>
          {data.columns?.map((column, index) => (
            <>
              {column.type === "image" && column.image && (
                <div key={index}>
                  <GatsbyImage
                    image={getImage(column.image)!!}
                    alt={column.altText}
                  />
                </div>
              )}
              {column.type === "image" && column.previewImage && (
                <div key={index}>
                  <img
                    className={styles.previewImage}
                    src={column.previewImage}
                    alt={column.altText}
                  />
                </div>
              )}
              {column.type === "paragraph" && (
                <ReactMarkdown className={styles.paragraphColumn} key={index}>
                  {column.text}
                </ReactMarkdown>
              )}
              {column.type === "divider" && (
                <hr
                  className={`${styles.divider} ${
                    data.backgroundColor ? styles.inverted : null
                  }`}
                />
              )}
            </>
          ))}
        </Grid>
      </section>
    </ConditionalWrapper>
  );
};

export default ColumnSection;
