import React, { FunctionComponent } from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import MainContent from "../components/main-content";

const PageTemplate: FunctionComponent<PageProps<any>> = ({ location, data }) => {
  return (
    <Layout image={data.frontPageImage} imageAlt="" logoScrollEffect={true}>
      <MainContent location={location}>
      </MainContent>
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
      motto {
        text
        size
        color
      }
    }
    frontPageImage: file(relativePath: { eq: "front-page-1.png" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
      }
    }
  }
`;
