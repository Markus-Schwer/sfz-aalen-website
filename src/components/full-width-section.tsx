import React, { FunctionComponent } from "react";

import "./full-width-section.scss";

const FullWidthSection: FunctionComponent<any> = ({ children, className }) => {
  return (
    <div className={"full-width-section " + className}>
      <section className="full-width-section-content">{children}</section>
    </div>
  );
};

export default FullWidthSection;
