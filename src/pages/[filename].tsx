import { FunctionComponent } from "react";

import Layout from "../components/layout";
import MainContent from "../components/main-content";
import { GetStaticPaths, GetStaticProps } from "next";
import { getStaticPropsForTina, gql, staticRequest } from "tinacms";
import BigHeaderSection from "../components/section/big-header-section";
import HeaderOnlySection from "../components/section/header-only-section";
import TwoColumnSection from "../components/section/two-column-section";
import IconBubbleSection from "../components/section/icon-bubble-section";

export type HeaderOnlySectionType = {
  __typename: "PagesPageSectionsHeaderOnlySection",
  headerOnlyHeader: {
    mainHeader: string,
    subHeader: string,
    divider?: boolean
  }
}

export type TwoColumnSectionType = {
  __typename: "PagesPageSectionsTwoColumnSection",
  twoColumnHeader?: {
    mainHeader: string,
    subHeader: string,
    divider?: boolean
  },
  backgroundColor?: string,
  columns: {
    __typename: "PagesPageSectionsTwoColumnSectionColumnsPicture",
    picture: string,
    altText: string,
    width: number,
    height: number
  }[] | {
    __typename: "PagesPageSectionsTwoColumnSectionColumnsParagraph",
    paragraph: string
  }[]
}

export type BigHeaderSectionType = {
  __typename: "PagesPageSectionsBigHeader",
  headerText: string
}

export type IconBubbleSectionType = {
  __typename: "PagesPageSectionsIconBubbleSection",
  numberColumns: number
  bubbles: {
    text: string
    icon: string
    backgroundColor: "primary" | "secondary" | "tertiary",
    href?: string
  }[]
}

type CMSPageProps = {
  pageData: {
    title: string,
    breadcrumbs: string[],
    logoScrollEffect: boolean,
    coverImages: string[],
    motto: {
      mottoText: string,
      color: "primary" | "secondary" | "tertiary",
      size: "small" | "medium" | "big"
    }[],
    pageSections: HeaderOnlySectionType[] | TwoColumnSectionType[] | BigHeaderSectionType[] | IconBubbleSectionType[]
  }
}

const CMSPage: FunctionComponent<CMSPageProps> = ({pageData}) => {
  let sectionComponents = [];
  for (const index in pageData.pageSections) {
    const pageSection = pageData.pageSections[index];
    switch (pageSection.__typename) {
      case "PagesPageSectionsBigHeader": {
        sectionComponents.push(<BigHeaderSection pageSection={pageSection} key={index}/>);
        break;
      }
      case "PagesPageSectionsHeaderOnlySection": {
        sectionComponents.push(<HeaderOnlySection pageSection={pageSection} key={index}/>);
        break;
      }
      case "PagesPageSectionsTwoColumnSection": {
        sectionComponents.push(<TwoColumnSection pageSection={pageSection} key={index}/>);
        break;
      }
      case "PagesPageSectionsIconBubbleSection": {
        sectionComponents.push(<IconBubbleSection pageSection={pageSection} key={index}/>);
        break;
      }
    }
  }

  return (
    <Layout image={pageData.coverImages[0]} imageAlt=""
            logoScrollEffect={pageData.logoScrollEffect}>
      <MainContent motto={pageData.motto} breadcrumbs={pageData.breadcrumbs}>
        {sectionComponents}
      </MainContent>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<CMSPageProps> = async ({params}) => {
  const tinaProps = await getStaticPropsForTina({
    query: gql`
      query PagesQuery($relativePath: String!) {
        getPagesDocument(relativePath: $relativePath) {
          data {
            breadcrumbs
            logoScrollEffect
            coverImages
            motto {
              mottoText
              color
              size
            }
            pageSections {
              __typename
              ... on PagesPageSectionsBigHeader {
                headerText
              }
              ... on PagesPageSectionsHeaderOnlySection {
                headerOnlyHeader: header {
                  mainHeader
                  subHeader
                  divider
                }
              }
              ... on PagesPageSectionsTwoColumnSection {
                twoColumnHeader: header {
                  mainHeader
                  subHeader
                  divider
                }
                backgroundColor
                columns {
                  __typename
                  ... on PagesPageSectionsTwoColumnSectionColumnsPicture {
                    picture
                    altText
                    width
                    height
                  }
                  ... on PagesPageSectionsTwoColumnSectionColumnsParagraph {
                    paragraph
                  }
                }
              }
              ... on PagesPageSectionsIconBubbleSection {
                numberColumns
                bubbles {
                  text
                  icon
                  backgroundColor
                }
              }
            }
          }
        }
      }
    `,
    variables: {relativePath: `${params?.filename}.md`},
  })
  return {
    props: {
      pageData: (tinaProps.data as any).getPagesDocument.data
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesListData = (await staticRequest({
    query: gql`
      query GetPagesList {
        getPagesList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
  })) as any

  return {
    paths: pagesListData.getPagesList.edges.map((page: any) => ({
      params: {filename: page.node.sys.filename},
    })),
    fallback: false,
  }
}

export default CMSPage;
