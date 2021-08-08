import React, { FunctionComponent } from "react";
import Link from 'next/link';
import Image from 'next/image';

import IconBubbleBackground from "../../public/icon-bubble-background.svg";

import styles from "./icon-bubble.module.scss";

type IconBubbleProps = {
  icon: string;
  text: string;
  color?: "primary" | "secondary" | "tertiary";
  href?: string;
  columnWidth?: number;
}

const IconBubble: FunctionComponent<IconBubbleProps> = ({
                                                          icon,
                                                          text,
                                                          color = "primary",
                                                          href,
                                                          columnWidth = 50
                                                        }) => {
  const colorNameMap = {
    "primary": styles.bubbleColorPrimary,
    "secondary": styles.bubbleColorSecondary,
    "tertiary": styles.bubbleColorTertiary
  };

  const bubbleContent = (
    <>
      <div className={styles.bubbleIconContainer}>
        <div className={styles.bubbleIcon}>
          <Image src={icon} alt={text} layout="fill" objectFit="contain"/>
        </div>
      </div>
      <IconBubbleBackground className={colorNameMap[color]}/>
      <span className={styles.bubbleText}>{text}</span>
    </>
  );

  if (href !== undefined) {
    return <Link href={href}><a className={styles.iconBubble}
                                style={{width: `${columnWidth}%`}}>{bubbleContent}</a></Link>;
  }

  return <div className={styles.iconBubble}
              style={{width: `${columnWidth}%`}}>{bubbleContent}</div>;
};

export default IconBubble;
