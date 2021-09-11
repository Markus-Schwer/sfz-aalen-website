import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";

import Header from "../../components/header";

const NavigationPreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
}) => {
  const data: any = entry.getIn(["data"]).toJS();

  return <Header logoScrollEffect={false} navigationData={data} />;
};

export default NavigationPreview;
