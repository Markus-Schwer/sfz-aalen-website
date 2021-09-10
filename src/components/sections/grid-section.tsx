import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import { GridSection as GridSectionData } from "../../../gatsby-node";

import * as styles from "./grid-section.module.scss";

const Grid = styled.div.attrs((props: { columns: number }) => props)`
  display: grid;
  gap: 36px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      calc(
        calc(1108px - 36px * ${(props) => props.columns - 1}) /
          ${(props) => props.columns}
      ),
      1fr
    )
  );
`;

export interface GridSectionProps {
  data: GridSectionData;
};

const GridSection: FunctionComponent<GridSectionProps> = ({ data }) => {
  return (
    <Grid columns={4}>
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
