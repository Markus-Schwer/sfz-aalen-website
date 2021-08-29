import React, { FunctionComponent } from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import { PageData } from "../../gatsby-node";

type PageTemplateProps = {
  pagesJson: PageData
}

const PageTemplate: FunctionComponent<PageProps<PageTemplateProps>> = ({ location, data }) => {
  return (
    <Layout pageData={data.pagesJson} location={location}>
      {/* <InlineBlocks name="pageSections" blocks={PageSectionBlocks}/> */}
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageByPath($id: String) {
    pagesJson(id: { eq: $id }) {
      title
      path
      breadcrumbs
      thumbnails {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
      motto {
        text
        size
        color
      }
    }
  }
`;
