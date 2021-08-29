import React, { FunctionComponent } from "react";
import { HeaderOnlySection as HeaderOnlySectionData } from "../../../gatsby-node";

type HeaderOnlySectionProps = {
  data: HeaderOnlySectionData
}

const HeaderOnlySection: FunctionComponent<HeaderOnlySectionProps> = ({data}) => {
  return (
    <section>
      <h1>{data.mainHeader}</h1>
      <h2>{data.subHeader}</h2>
      {data.divider ? <hr /> : null}
    </section>
  );
}

export default HeaderOnlySection;
