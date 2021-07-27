import React, { FunctionComponent, ReactNode } from "react";
import { Link } from "gatsby";

import IconBubbleBackground from "../images/icon-bubble-background.svg";

import "./icon-bubble.scss"

type IconBubbleProps = {
  icon: ReactNode;
  text: string;
  color?: "primary" | "secondary" | "tertiary";
  to?: string
}

const IconBubble: FunctionComponent<IconBubbleProps> = ({ icon, text, color = "primary", to }) => {
  const bubbleContent = (
    <>
      <div className="bubble-icon-container">
        {icon}
      </div>
      <IconBubbleBackground className={"bubble-color-" + color} />
      <span className="bubble-text">{text}</span>
    </>
  );

  if (to !== undefined) {
    return <Link className="icon-bubble col-6" to={to}>{bubbleContent}</Link>;
  }

  return <div className="icon-bubble col-6">{bubbleContent}</div>;
};

export default IconBubble;
