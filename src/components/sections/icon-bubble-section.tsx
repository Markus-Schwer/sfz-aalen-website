import React, { FunctionComponent } from "react";
import { IconBubbleSection as IconBubbleSectionData } from "../../../gatsby-node";

import IconBubble from "../icon-bubble";

import * as styles from "./icon-bubble-section.module.scss";

type IconBubbleSectionProps = {
  data: IconBubbleSectionData
}

const IconBubbleSection: FunctionComponent<IconBubbleSectionProps> = ({data}) => {
  const numberOfColumns = data.numberColumns || 2;
  const columnWidth = 100 / numberOfColumns;
  return (
    <div className={styles.iconBubbleContainer} style={{flexBasis: `${columnWidth}%`}}>
      {data.bubbles.map((bubble, index) => (
        <IconBubble
          icon={bubble.previewIcon || bubble.icon?.publicURL}
          text={bubble.text}
          color={bubble.color}
          columnWidth={columnWidth}
          href={bubble.href}
          key={index}
        />
      ))}
    </div>
  );
}

export default IconBubbleSection;
