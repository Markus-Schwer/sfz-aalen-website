import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";

import { PageData } from "../../../gatsby-node";
import PageTemplate from "../../templates/page-template";

const PageTemplatePreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const data: PageData = entry.getIn(["data"]).toJS();
  const dummy = {} as any;

  data.previewThumbnails =
    data.thumbnailUrls?.map((path) => getAsset(path).url) || [];

  for (const section of data.pageSections) {
    if (section.type === "twoColumnSection" && section.columns) {
      for (const column of section.columns) {
        if (column.type === "image" && column.imageUrl) {
          column.previewImage = getAsset(column.imageUrl).url;
        }
      }
    }
  }

  return (
    <PageTemplate
      data={{ pagesJson: data }}
      path={data.path}
      location={dummy}
      uri={dummy}
      navigate={dummy}
      children={dummy}
      params={dummy}
      pageResources={dummy}
      pageContext={dummy}
    />
  );
};

export default PageTemplatePreview;
