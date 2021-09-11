import React, { FunctionComponent } from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import { PageData } from "../../gatsby-node";

import BigHeaderSection from "../components/sections/big-header-section";
import HeaderOnlySection from "../components/sections/header-only-section";
import ColumnSection from "../components/sections/column-section";
import BubbleSection from "../components/sections/bubble-section";
import BigTextSection from "../components/sections/big-text-section";
import GridSection from "../components/sections/grid-section";
import BannerSection from "../components/sections/banner-section";

type PageTemplateProps = {
  pagesJson: PageData
}

const PageTemplate: FunctionComponent<PageProps<PageTemplateProps>> = ({ data }) => {
  return (
    <Layout pageData={data.pagesJson}>
      {data.pagesJson.pageSections?.map((section, index) => {
        switch (section.type) {
          case "bigHeaderSection":
            return <BigHeaderSection data={section} key={index} />;
            case "bigTextSection":
              return <BigTextSection data={section} key={index} />;
          case "headerOnlySection":
            return <HeaderOnlySection data={section} key={index} />;
          case "columnSection":
            return <ColumnSection data={section} key={index} />;
          case "bubbleSection":
            return <BubbleSection data={section} key={index} />;
          case "gridSection":
            return <GridSection data={section} key={index} />;
            case "bannerSection":
              return <BannerSection data={section} key={index} />;
          default:
            break;
        }
      })}
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
      pageSections {
        type
        text
        subHeader
        mainHeader
        divider
        backgroundColor
        textColor
        header {
          divider
          mainHeader
          subHeader
        }
        columns {
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
          type
          altText
          text
        }
        numberColumns
        bubbles {
          text
          image {
            publicURL
            extension
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
          color
          href
        }
        items {
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, aspectRatio: 0.83)
            }
          }
          altText
          description
        }
        mainText
        subText
        color
      }
    }
  }
`;
