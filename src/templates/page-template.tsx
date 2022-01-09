import React, { FunctionComponent } from "react";
import { graphql, PageProps } from "gatsby";

import { PageData } from "../page-data";

import {
  Layout,
  BigHeaderSection,
  HeaderOnlySection,
  BubbleSection,
  BigTextSection,
  GridSection,
  BannerSection,
  ColumnSection,
  WorkshopsSection,
  SEO,
} from "../components";
import AccordionSection from "../components/sections/accordion-section";

type PageTemplateProps = {
  pagesJson: PageData;
};

const PageTemplate: FunctionComponent<PageProps<PageTemplateProps>> = ({
  data,
}) => {
  return (
    <>
      <SEO title={data.pagesJson.title} />
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
            case "workshopsSection":
              return <WorkshopsSection data={section} key={index} />;
            case "spacerSection":
              return <br style={{ lineHeight: "4em" }} key={index} />;
            case "accordionSection":
              return <AccordionSection data={section} key={index} />;
            default:
              break;
          }
        })}
      </Layout>
    </>
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
          gatsbyImageData(
            placeholder: BLURRED
            layout: FULL_WIDTH
            quality: 100
          )
        }
      }
      motto {
        text
        size
        color
      }
      pageSections {
        type
        sectionId
        subHeader
        mainHeader
        divider
        backgroundColor
        header {
          divider
          mainHeader
          subHeader
          sectionId
        }
        columns {
          width
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
          type
          altText
          text
          header {
            header
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
              }
            }
          }
          columns {
            type
            altText
            text
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
              }
            }
          }
          numberColumns
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
              gatsbyImageData(
                placeholder: BLURRED
                layout: FULL_WIDTH
                aspectRatio: 0.83
              )
            }
          }
          altText
          description
          header
          text
        }
        mainText
        subText
        color
        workshopOrder: workshops
        workshops: childrenWorkshops {
          title
          header
          thumbnail {
            altText
            image {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  aspectRatio: 1
                  height: 184
                )
              }
            }
          }
          numberColumns
          columns {
            type
            altText
            text
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
              }
            }
          }
          footer
          fields {
            slug
          }
        }
      }
    }
  }
`;
