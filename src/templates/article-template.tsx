import React, { FunctionComponent } from "react";
import { graphql, Link, PageProps } from "gatsby";
import ReactMarkdown from "react-markdown";

import { PageData, ArticleData } from "../page-data";

import { Button, HeaderOnlySection, Layout } from "../components";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";

export type PageTemplateProps = {
  article: ArticleData;
  thumbnails?: {
    nodes: ImageDataLike[];
  };
  previewThumbnails?: string[];
};

const PageTemplate: FunctionComponent<PageProps<PageTemplateProps>> = ({
  data,
}) => {
  const pageData: PageData = {
    path: `aktuelles/${data.article.fields.slug}`,
    title: data.article.title,
    breadcrumbs: ["Aktuelles / Artikel"],
    thumbnails: data.thumbnails?.nodes,
    previewThumbnails: data.previewThumbnails,
    motto: [
      {
        text: "Wissen",
        size: "medium",
        color: "primary",
      },
      {
        text: "Schafft.",
        size: "small",
        color: "tertiary",
      },
      {
        text: "Spass!",
        size: "big",
        color: "secondary",
      },
    ],
    pageSections: [],
  };

  return (
    <Layout pageData={pageData}>
      <HeaderOnlySection
        data={{
          type: "headerOnlySection",
          mainHeader: data.article.mainHeader,
          subHeader: data.article.subHeader || "",
          divider: true,
        }}
      />
      {data.article.thumbnail.image && (
        <GatsbyImage
          image={getImage(data.article.thumbnail.image) as IGatsbyImageData}
          alt={data.article.thumbnail.altText}
        />
      )}
      {data.article.thumbnail.previewImage && (
        <img
          style={{width: "100%"}}
          src={data.article.thumbnail.previewImage}
          alt={data.article.thumbnail.altText}
        />
      )}
      {!!data.article.introduction && (
        <ReactMarkdown>{data.article.introduction}</ReactMarkdown>
      )}
      <hr />
      <ReactMarkdown>{data.article.text}</ReactMarkdown>
      <br style={{ lineHeight: 4 }} />
      <Link to="/aktuelles">
        <Button>Zurück zur Übersicht</Button>
      </Link>
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query ArticleBySlug($slug: String) {
    article: articlesJson(fields: { slug: { eq: $slug } }) {
      id
      title
      thumbnail {
        altText
        image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, quality: 100)
          }
        }
      }
      mainHeader
      subHeader
      introduction
      creationDate
      text
      fields {
        slug
      }
    }
    thumbnails: allFile(
      filter: { relativePath: { eq: "images/uploads/front-page-1.jpg" } }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, quality: 100)
        }
      }
    }
  }
`;
