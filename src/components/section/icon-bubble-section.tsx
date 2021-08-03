import { FunctionComponent } from "react";

import IconBubble from "../icon-bubble";
import { IconBubbleSectionType } from "../../pages/[filename]";

import styles from "./icon-bubble-section.module.scss";

type IconBubbleSectionProps = {
  pageSection: IconBubbleSectionType
}

const IconBubbleSection: FunctionComponent<IconBubbleSectionProps> = ({pageSection}) => {
  const numberOfColumns = pageSection.numberColumns || 2;
  const columnWidth = 100 / numberOfColumns;
  return (
    <div className={styles.iconBubbleContainer} style={{flexBasis: `${columnWidth}%`}}>
      {pageSection.bubbles.map((bubble, index) => (
        <IconBubble
          icon={bubble.icon}
          text={bubble.text}
          color={bubble.backgroundColor}
          href={bubble.href}
          key={index}
        />
      ))}
    </div>
  );
}

export default IconBubbleSection;
