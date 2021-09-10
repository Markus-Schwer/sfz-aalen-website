import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from 'react-markdown';
import { GridSection as GridSectionData } from "../../../gatsby-node";

import Grid from "../grid";

import * as styles from "./grid-section.module.scss";

export interface GridSectionProps {
  data: GridSectionData;
};

const GridSection: FunctionComponent<GridSectionProps> = ({ data }) => {
  return (
    <Grid columns={4} gap={36}>
      {data.items.map((item, index) => (
        <div key={index}>
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
        </div>
      ))}
    </Grid>
  );
};

export default GridSection;
