import React, { FunctionComponent } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { ImageColumn as ImageColumnData } from "../../page-data";

import { Column, GridSizes } from "../grid";

import * as styles from "./image-column.module.scss";

type ImageColumnProps = {
  columnData: ImageColumnData;
  columnWidth: GridSizes;
};

const ImageColumn: FunctionComponent<ImageColumnProps> = ({ columnData, columnWidth }) => {
  if (columnData.image) {
    return (
      <Column sm={12} md={12} lg={columnWidth}>
        <GatsbyImage
          image={getImage(columnData.image)!!}
          alt={columnData.altText}
        />
      </Column>
    );
  } else {
    return (
      <Column sm={12} md={12} lg={columnWidth}>
        <img
          className={styles.previewImage}
          src={columnData.previewImage}
          alt={columnData.altText}
        />
      </Column>
    );
  }
};

export default ImageColumn;
