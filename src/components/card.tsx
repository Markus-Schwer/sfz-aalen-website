import React, { FunctionComponent, useState } from "react";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import Collapse from "@kunukn/react-collapse";

import DropdownIcon from "../images/dropdown-icon.svg";

import * as styles from "./card.module.scss";

type CardProps = {
  mainHeader: string;
  subHeader?: string;
  anchorId?: string;
  imageData?: ImageDataLike;
  previewImage?: string;
  imageAlt?: string;
};

const Card: FunctionComponent<CardProps> = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`${styles.card} ${collapsed ? styles.collapsed : ""}`}>
      <div
        className={styles.cardHeader}
        onClick={() => setCollapsed(!collapsed)}
      >
        {(props.imageData || props.previewImage) && (
            <div className={styles.headerImage}>
              {props.imageData && (
                <GatsbyImage
                  image={getImage(props.imageData)!!}
                  alt={props.imageAlt || ""}
                />
              )}
              {props.previewImage && (
                <img
                  className={styles.previewImage}
                  src={props.previewImage}
                  alt={props.imageAlt}
                />
              )}
            </div>
          )}
        <div className={styles.headerText}>
          <h1>{props.mainHeader}</h1>
          {props.subHeader && <h2>{props.subHeader}</h2>}
        </div>
        <div className={styles.dropdownIconContainer}>
          <DropdownIcon className={styles.dropdownIcon} />
        </div>
      </div>
      <Collapse className={styles.content} isOpen={!collapsed}>
        <div>{props.children}</div>
      </Collapse>
    </div>
  );
};

export default Card;
