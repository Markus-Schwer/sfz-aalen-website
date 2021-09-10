import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";

import * as styles from "./column-section.module.scss";

import FullWidthSection from "../full-width-section";
import { ColumnSection as ColumnSectionData } from "../../../gatsby-node";
import Grid from "../grid";

type ColumnSectionProps = {
  data: ColumnSectionData;
};

const ColumnSection: FunctionComponent<ColumnSectionProps> = ({ data }) => {
  const sectionChildren = (
    <>
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
    </>
  );

  if (!!data.backgroundColor) {
    return (
      <FullWidthSection style={{ backgroundColor: data.backgroundColor }}>
        {sectionChildren}
      </FullWidthSection>
    );
  } else {
    return <section>{sectionChildren}</section>;
  }
};

export default ColumnSection;
