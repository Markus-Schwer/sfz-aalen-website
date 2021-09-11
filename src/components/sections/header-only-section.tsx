import React, { FunctionComponent } from "react";
import { HeaderOnlySection as HeaderOnlySectionData } from "../../../gatsby-node";

import * as layoutStyles from "../layout.module.scss";

type HeaderOnlySectionProps = {
  data: HeaderOnlySectionData
}

const HeaderOnlySection: FunctionComponent<HeaderOnlySectionProps> = ({data}) => {
  return (
    <section>
      {data.sectionId && (
        <a className={layoutStyles.sectionAnchor} id={data.sectionId}></a>
      )}
      <h1>{data.mainHeader}</h1>
      <h2>{data.subHeader}</h2>
      {data.divider ? <hr /> : null}
    </section>
  );
}

export default HeaderOnlySection;
