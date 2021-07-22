import React, { FunctionComponent } from "react";
import { WindowLocation } from "@reach/router";

import "./main-content.scss";

import BubbleHeaderBackground from "../images/bubble-header-background.svg";

type MainContentProps = {
  location: WindowLocation<WindowLocation["state"]>;
};

const MainContent: FunctionComponent<MainContentProps> = ({
  children
}) => {
  return (
    <div className="main-container">
      <span className="current-page-name">Home</span>
      <div className="main-title">
        <BubbleHeaderBackground className="main-title-background" height={230}/>
        <div className="main-title-text">
          <span className="main-title-primary main-title-medium">Wissen.</span>
          <span className="main-title-tertiary main-title-small">Schafft.</span>
          <span className="main-title-secondary main-title-big">Spass!</span>
        </div>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainContent;