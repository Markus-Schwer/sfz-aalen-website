import React, { FunctionComponent } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

import * as styles from "./bubble.module.scss";
import ConditionalWrapper from "./conditional-wrapper";
import styled from "styled-components";

type BubbleProps = {
  icon?: string;
  iconPreview?: string;
  image?: ImageDataLike;
  previewImage?: string;
  text: string;
  color?: "primary" | "secondary" | "tertiary";
  href?: string;
};

const colorNameMap = {
  primary: styles.bubbleColorPrimary,
  secondary: styles.bubbleColorSecondary,
  tertiary: styles.bubbleColorTertiary,
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
  const imageData = image ? getImage(image) : undefined;

  return (
    <ConditionalWrapper
      condition={!!href}
      wrapper={(children) => <Link to={href!!}>{children}</Link>}
    >
      <div className={styles.iconBubble}>
        {(icon || iconPreview) && (
          <div className={styles.bubbleIconContainer}>
            <img src={iconPreview || icon} alt={text} />
          </div>
        )}
        {(imageData || previewImage) && (
          <div className={`${styles.bubbleImageContainer} ${text.length > 14 && styles.large}`}>
            <div>
              {imageData && <GatsbyImage image={imageData} alt={text} />}
              {previewImage && <img src={previewImage} alt={text} />}
            </div>
          </div>
        )}
        {/* use inline svg with text field for text scaling */}
        <svg
          viewBox="0 0 711.59 442.04"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.bubbleBackground} ${colorNameMap[color]}`}
        >
          {text.length <= 14 && (
            <>
              <path
                d="M711.559 163.689C711.972 38.405 634.64.226 436.779.226c-134.13 0-338.845-6.741-403.75 62.89C-4.015 102.584-1.349 164.061 2.651 219.577c7.816 108.477 34.666 187.262 218.661 187.355 183.996.087 379.99 12.17 447.99-63.356 27.81-30.89 41.838-54.6 42.251-179.888"
                className="main-bubble"
              />
              <path
                d="M355.26 393.15c1.126-31.126-25.464-32.39-107.14-33.42-45.617-.576-228.073-2.177-241.006 13.41-12.944 15.587-6.228 44.264 4.157 57.58 6.649 8.527 20.277 10.264 93.355 11.186 61.572.777 213.141-1.498 230.9-6.419 19.848-5.501 19.04-22.92 19.742-42.337"
                className="text-bubble"
              />
              <text
                x="28.466"
                y="416.413"
                fontWeight="400"
                fontSize="46.667"
                fontFamily="Kardia-Fat"
                fill="#fff"
                strokeWidth="1.333"
                className={styles.bubbleText}
              >
                {text}
              </text>
            </>
          )}
          {text.length > 14 && (
            <>
              <path
                d="M711.559 163.8C711.972 38.516 634.64.337 436.779.337c-134.13 0-338.845-6.741-403.75 62.889-37.044 39.47-34.378 100.947-30.378 156.463 7.816 108.477 34.666 187.262 218.661 187.355 183.996.087 379.99 12.17 447.99-63.356 27.81-30.89 41.838-54.6 42.251-179.888"
                className="main-bubble"
              />
              <path
                d="M459.085 349.528c1.125-31.524-25.465-32.804-107.14-33.847-41.72-.533-283.86-5.496-334.738 6.344-4.755 1.105-10.667 6.752-12.647 11.326-9.293 21.49-3.065 83.792 6.592 96.335 6.65 8.636 20.277 10.396 93.355 11.33 61.573.786 317.086-1.518 334.832-6.502 19.847-5.57 19.04-65.32 19.74-84.986"
                className="text-bubble"
              />
              <foreignObject x="28.842" y="327.744" width="400" height="110">
                <div className={styles.bubbleText}>{text}</div>
              </foreignObject>
            </>
          )}
        </svg>
      </div>
    </ConditionalWrapper>
  );
};

export default Bubble;
