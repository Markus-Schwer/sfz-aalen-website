import React, { FunctionComponent } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

import BubbleBackground from "../images/icon-bubble-background.svg";

import * as styles from "./bubble.module.scss";

type BubbleProps = {
  icon?: string;
  iconPreview?: string;
  image?: ImageDataLike;
  previewImage?: string;
  text: string;
  color?: "primary" | "secondary" | "tertiary";
  href?: string;
};

const Bubble: FunctionComponent<BubbleProps> = ({
  icon,
  iconPreview,
  image,
  previewImage,
  text,
  color = "primary",
  href,
}) => {
  const colorNameMap = {
    primary: styles.bubbleColorPrimary,
    secondary: styles.bubbleColorSecondary,
    tertiary: styles.bubbleColorTertiary,
  };

  const bubbleContent = (
    <>
      {(icon || iconPreview) && (
        <div className={styles.bubbleIconContainer}>
          <img src={iconPreview || icon} alt={text} />
        </div>
      )}
      {(image || previewImage) && (
        <div className={styles.bubbleImageContainer}>
          <div>
            {image && <GatsbyImage image={getImage(image)!!} alt={text} />}
            {previewImage && <img src={previewImage} alt={text} />}
          </div>
        </div>
      )}
      {/* use inline svg with text field for text scaling */}
      <svg viewBox="0 0 711.59 442.04" xmlns="http://www.w3.org/2000/svg" className={`${styles.bubbleBackground} ${colorNameMap[color]}`}>
        <path
          d="M711.559 163.689C711.972 38.405 634.64.226 436.779.226c-134.13 0-338.845-6.741-403.75 62.89C-4.015 102.584-1.349 164.061 2.651 219.577c7.816 108.477 34.666 187.262 218.661 187.355 183.996.087 379.99 12.17 447.99-63.356 27.81-30.89 41.838-54.6 42.251-179.888"
          className="main-bubble" />
        <path
          d="M355.26 393.15c1.126-31.126-25.464-32.39-107.14-33.42-45.617-.576-228.073-2.177-241.006 13.41-12.944 15.587-6.228 44.264 4.157 57.58 6.649 8.527 20.277 10.264 93.355 11.186 61.572.777 213.141-1.498 230.9-6.419 19.848-5.501 19.04-22.92 19.742-42.337"
          className="text-bubble" />
        <text x="28.466" y="416.413" font-weight="400" font-size="46.667" font-family="Kardia-Fat" fill="#fff" stroke-width="1.333" className={styles.bubbleText}>
          {text}
        </text>
      </svg>
    </>
  );

  if (href !== undefined) {
    return (
      <Link className={styles.iconBubble} to={href}>
        {bubbleContent}
      </Link>
    );
  }

  return <div className={styles.iconBubble}>{bubbleContent}</div>;
};

export default Bubble;
