import { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getStaticPropsForTina,
  gql,
  staticRequest,
  useForm,
  usePlugin
} from "tinacms";
import { Block, InlineBlocks, InlineForm } from 'react-tinacms-inline';
import type { PagesDocument } from "../../.tina/__generated__/types";

import Layout from "../components/layout";
import MainContent from "../components/main-content";
import BigHeaderSection from "../components/section/big-header-section";
import HeaderOnlySection from "../components/section/header-only-section";
import TwoColumnSection from "../components/section/two-column-section";
import IconBubbleSection from "../components/section/icon-bubble-section";

type CMSPageProps = PagesDocument;

const CMSPage: FunctionComponent<CMSPageProps> = (props) => {
  const [data, form] = useForm({...props.form, initialValues: props.values});
  usePlugin(form);

  const BlogPostCreatorPlugin = {
    __type: 'content-creator',
    name: "Seite erstellen",
    fields: [
      {
        label: 'Titel',
        name: 'title',
        component: 'text'
      },
      {
        label: 'Breadcrumbs',
        name: 'breadcrumbs',
        component: 'list',
        field: {
          component: "text"
        },
        validate(title: any) {
          if (!title) return 'Required.'
        },
      },
      {
        label: 'Titelbild',
        name: 'coverImages',
        component: 'image'
      },
    ],
    onSubmit(values: any, cms: any) {
      // Call functions that create the new blog post. For example:
      cms.apis.someBackend.createPost(values);
    },
  };
  usePlugin(BlogPostCreatorPlugin);

  return (
    <InlineForm form={form}>
      <Layout image={data.coverImages[0]} imageAlt=""
              logoScrollEffect={data.logoScrollEffect}>
        <MainContent data={data}>
          <InlineBlocks name="pageSections" blocks={PageSectionBlocks}/>
        </MainContent>
      </Layout>
    </InlineForm>
  );
};

const PageSectionBlocks: { [key: string]: Block } = {
  bigHeader: {
    Component: BigHeaderSection,
    template: {
      label: "Große Überschrift",
      defaultItem: {
        headerText: "Große Überschrift"
      }
    }
  },
  headerOnlySection: {
    Component: HeaderOnlySection,
    template: {
      label: "Überschrift",
      defaultItem: {
        header: {
          mainHeader: "Überschrift",
          subHeader: "Unter-Überschrift",
          divider: true
        },
      }
    }
  },
  twoColumnSection: {
    Component: TwoColumnSection,
    template: {
      label: "Abschnitt mit zwei Spalten",
      defaultItem: {
        header: {
          mainHeader: "Überschrift",
          subHeader: "Unter-Überschrift",
          divider: true
        },
        columns: []
      }
    }
  },
  iconBubbleSection: {
    Component: IconBubbleSection,
    template: {
      label: "Abschnitt mit Icon Blasen",
      defaultItem: {
        numberColumns: 2,
        bubbles: [
          {
            text: "Text 1",
            icon: "/microscope.svg",
            backgroundColor: "tertiary"
          },
          {
            text: "Text 2",
            icon: "/microscope.svg",
            backgroundColor: "tertiary"
          },
          {
            text: "Text 3",
            icon: "/microscope.svg",
            backgroundColor: "tertiary"
          },
          {
            text: "Text 4",
            icon: "/microscope.svg",
            backgroundColor: "tertiary"
          }
        ]
      }
    }
  }
}

export const getStaticProps: GetStaticProps<CMSPageProps> = async ({params}) => {
  const tinaProps = await getStaticPropsForTina({
    query: `#graphql
      query PagesQuery($relativePath: String!) {
        getPagesDocument(relativePath: $relativePath) {
          form
          values
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
    variables: {relativePath: `${params?.filename}.json`},
  }) as { data: { getPagesDocument: PagesDocument } };

  return {
    props: {
      ...tinaProps.data.getPagesDocument
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
