import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from 'react-markdown';
import { GridSection as GridSectionData } from "../../page-data";

import { Row, Column } from "../grid";

import * as styles from "./grid-section.module.scss";

export interface GridSectionProps {
  data: GridSectionData;
};

const GridSection: FunctionComponent<GridSectionProps> = ({ data }) => {
  return (
    <Row>
      {data.items.map((item, index) => (
        <Column sm={6} md={4} lg={3} key={index}>
          {item.image && <GatsbyImage image={getImage(item.image)!!} alt={item.altText} />}
          {item.previewImage && (
            <div className={styles.previewImageContainer}>
              <div>
                <img src={item.previewImage} alt={item.altText} />
              </div>
            </div>
          )}
          <ReactMarkdown className={styles.imageDescription}>
            {item.description}
          </ReactMarkdown>
        </Column>
      ))}
    </Row>
  );
};

export default GridSection;
