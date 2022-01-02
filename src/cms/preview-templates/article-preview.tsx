import React, { FunctionComponent } from "react";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import { BreakpointProvider } from "gatsby-plugin-breakpoints";

import ArticleTemplate, {
  PageTemplateProps,
} from "../../templates/article-template";
import { mapPreviewImage } from "../../utils";

const defaultQueries = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 720px)",
  md: "(max-width: 1024px)",
  l: "(max-width: 1536px)",
};

const ArticlePreview: FunctionComponent<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const entryData: any = entry.getIn(["data"]).toJS();
  const slug: string = entry.getIn(["slug"]);
  const dummy = {} as any;

  const data: PageTemplateProps = {
    article: {
      ...entryData,
      thumbnail: mapPreviewImage(entryData.thumbnail, getAsset),
      fields: {
        slug: slug,
      },
    },
    previewThumbnails: [getAsset("images/uploads/front-page-1.jpg").url],
  };

  return (
    <BreakpointProvider queries={defaultQueries}>
      <ArticleTemplate
        data={data}
        path={"aktuelles" + slug}
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

export default ArticlePreview;
