import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";

import { PageData } from "../../../gatsby-node";
import PageTemplate from "../../templates/page-template";

const defaultQueries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 720px)',
  md: '(max-width: 1024px)',
  l: '(max-width: 1536px)',
};

const PageTemplatePreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const data: PageData = entry.getIn(["data"]).toJS();
  const dummy = {} as any;

  data.previewThumbnails =
    data.thumbnailUrls?.map((path) => getAsset(path).url) || [];

  if (data.pageSections) {
    for (const section of data.pageSections) {
      if (section.type === "columnSection" && section.columns) {
        for (const column of section.columns) {
          if (column.type === "image" && column.imageUrl) {
            column.previewImage = getAsset(column.imageUrl).url;
          }
        }
      } else if (section.type === "bubbleSection" && section.bubbles) {
        for (const bubble of section.bubbles) {
          if (bubble.imageUrl) {
            bubble.previewImage = getAsset(bubble.imageUrl).url;
            bubble.image = { extension: "svg" } as any;
          }
        }
      } else if (section.type === "gridSection" && section.items) {
        for (const item of section.items) {
          if (item.imageUrl) {
            item.previewImage = getAsset(item.imageUrl).url;
          }
        }
      }
    }
  }

  return (
    <BreakpointProvider queries={defaultQueries}>
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
    </BreakpointProvider>
  );
};

export default PageTemplatePreview;
