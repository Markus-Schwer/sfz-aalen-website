import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from 'react-markdown';

import * as layoutStyles from "../layout.module.scss";
import * as styles from "./two-column-section.module.scss";

import FullWidthSection from "../full-width-section";
import { TwoColumnSection as TwoColumnSectionData } from "../../../gatsby-node";

type TwoColumnSectionProps = {
  data: TwoColumnSectionData;
};

const TwoColumnSection: FunctionComponent<TwoColumnSectionProps> = ({ data }) => {
  const sectionChildren = (
    <>
      {data.header && (
        <>
          <h1>{data.header.mainHeader}</h1>
          <h2>{data.header.subHeader}</h2>
          {data.header.divider ? (
            <hr
              className={
                data.backgroundColor ? layoutStyles.inverted : null
              }
            />
          ) : null}
        </>
      )}
      <div className="row">
        {data.columns.map((column, index) => {
          if (column.type === "image" && column.image)
            return (
              <div className="col-6" key={index}>
                <GatsbyImage
                  image={getImage(column.image)!!}
                  alt={column.altText}
                />
              </div>
            );
          if (column.type === "image" && column.previewImage)
            return (
              <div className="col-6" key={index}>
                <img className={styles.previewImage} src={column.previewImage} alt={column.altText} />
              </div>
            );
          if (column.type === "paragraph")
            return (
              <ReactMarkdown className={["col-6", styles.paragraphColumn].join(" ")} key={index}>{column.text}</ReactMarkdown>
            );
        })}
      </div>
    </>
  );

  if (data.backgroundColor != undefined) {
    return (
      <FullWidthSection style={{ backgroundColor: data.backgroundColor }}>
        {sectionChildren}
      </FullWidthSection>
    );
  } else {
    return <section>{sectionChildren}</section>;
  }
};

export default TwoColumnSection;
