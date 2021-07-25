import React, { FunctionComponent, ReactNode } from "react";

import IconBubbleBackground from "../images/icon-bubble-background.svg";

import "./icon-bubble.scss"

type IconBubbleProps = {
  icon: ReactNode;
  text: string;
  color?: "primary" | "secondary" | "tertiary";
}

const IconBubble: FunctionComponent<IconBubbleProps> = ({ icon, text, color = "primary" }) => {
  return (
    <div className="icon-bubble col-6">
      <div className="bubble-icon-container">
        {icon}
      </div>
      <IconBubbleBackground className={"bubble-color-" + color} />
      <span className="bubble-text">{text}</span>
    </div>
  );
};

export default IconBubble;
