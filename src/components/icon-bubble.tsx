import { Link } from "gatsby";
import React, { FunctionComponent } from "react";

import IconBubbleBackground from "../../public/icon-bubble-background.svg";

import * as styles from "./icon-bubble.module.scss";

type IconBubbleProps = {
  icon: string;
  text: string;
  color?: "primary" | "secondary" | "tertiary";
  href?: string;
  columnWidth?: number;
};

const IconBubble: FunctionComponent<IconBubbleProps> = ({
  icon,
  text,
  color = "primary",
  href,
  columnWidth = 50,
}) => {
  const colorNameMap = {
    primary: styles.bubbleColorPrimary,
    secondary: styles.bubbleColorSecondary,
    tertiary: styles.bubbleColorTertiary,
  };

  const bubbleContent = (
    <>
      <div className={styles.bubbleIconContainer}>{icon}</div>
      <IconBubbleBackground className={colorNameMap[color]} />
      <span className={styles.bubbleText}>{text}</span>
    </>
  );

  if (href !== undefined) {
    return (
      <Link
        className={styles.iconBubble}
        style={{ width: `${columnWidth}%` }}
        to={href}
      >
        {bubbleContent}
      </Link>
    );
  }

  return (
    <div className={styles.iconBubble} style={{ width: `${columnWidth}%` }}>
      {bubbleContent}
    </div>
  );
};

export default IconBubble;
