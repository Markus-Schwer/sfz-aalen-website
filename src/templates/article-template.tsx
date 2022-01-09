import React, { FunctionComponent } from "react";
import { graphql, Link, PageProps } from "gatsby";
import ReactMarkdown from "react-markdown";

import { PageData, ArticleData } from "../page-data";

import { Button, HeaderOnlySection, Layout, SEO } from "../components";
import {
  GatsbyImage,
  getImage,
  getSrc,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";

export type PageTemplateProps = {
  file: {
    modifiedTime: string;
    birthTime: string;
    article: ArticleData;
  };
  thumbnails?: {
    nodes: ImageDataLike[];
  };
  previewThumbnails?: string[];
};

const PageTemplate: FunctionComponent<PageProps<PageTemplateProps>> = ({
  data,
}) => {
  const pageData: PageData = {
    path: `aktuelles/${data.file.article.fields.slug}`,
    title: data.file.article.title,
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
    <>
      {data.file.article.thumbnail.image && (
        <SEO
          title={pageData.title}
          description={data.file.article.introduction}
          image={getSrc(data.file.article.thumbnail.image)}
          article={{
            first_publication_date: data.file.birthTime,
            last_publication_date: data.file.modifiedTime,
          }}
        />
      )}
      <Layout pageData={pageData}>
        <HeaderOnlySection
          data={{
            type: "headerOnlySection",
            mainHeader: data.file.article.mainHeader,
            subHeader: data.file.article.subHeader || "",
            divider: true,
          }}
        />
        {data.file.article.thumbnail.image && (
          <GatsbyImage
            image={
              getImage(data.file.article.thumbnail.image) as IGatsbyImageData
            }
            alt={data.file.article.thumbnail.altText}
          />
        )}
        {data.file.article.thumbnail.previewImage && (
          <img
            style={{ width: "100%" }}
            src={data.file.article.thumbnail.previewImage}
            alt={data.file.article.thumbnail.altText}
          />
        )}
        {!!data.file.article.introduction && (
          <ReactMarkdown>{data.file.article.introduction}</ReactMarkdown>
        )}
        <hr />
        <ReactMarkdown>{data.file.article.text}</ReactMarkdown>
        <br style={{ lineHeight: 4 }} />
        <Link to="/aktuelles">
          <Button>Zurück zur Übersicht</Button>
        </Link>
      </Layout>
    </>
  );
};

export default PageTemplate;

export const query = graphql`
  query ArticleBySlug($slug: String) {
    file(sourceInstanceName: { eq: "articles" }, name: { eq: $slug }) {
      modifiedTime
      birthTime
      article: childArticlesJson {
        id
        title
        thumbnail {
          altText
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                layout: FULL_WIDTH
                quality: 100
              )
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
    }
    thumbnails: allFile(
      filter: { relativePath: { eq: "images/uploads/front-page-1.jpg" } }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            layout: FULL_WIDTH
            quality: 100
          )
        }
      }
    }
  }
`;
