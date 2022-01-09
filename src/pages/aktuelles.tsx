import React, { FunctionComponent } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import Clamp from "react-multiline-clamp";

import { PageData, ArticleData } from "../page-data";
import * as styles from "./aktuelles.module.scss";

import {
  Layout,
  HeaderOnlySection,
  Column,
  Row,
  AccordionSection,
  SEO,
} from "../components";

type ArticlesQuery = {
  currentArticles: {
    edges: {
      node: ArticleData;
    }[];
  };
  archivedArticles: {
    edges: {
      node: ArticleData;
    }[];
  };
  thumbnails?: {
    nodes: ImageDataLike[];
  };
};

const Articles: FunctionComponent = () => {
  const data = useStaticQuery<ArticlesQuery>(ARTICLES_QUERY);

  const pageData: PageData = {
    path: "aktuelles",
    title: "Aktuelles",
    breadcrumbs: ["Aktuelles"],
    thumbnails: data.thumbnails?.nodes,
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
      <SEO title={pageData.title} />
      <Layout pageData={pageData}>
        <HeaderOnlySection
          data={{
            type: "headerOnlySection",
            mainHeader: "News",
            subHeader: "",
            divider: true,
            sectionId: "news",
          }}
        />
        <section>
          <Row>
            {data.currentArticles.edges
              .map((edge) => edge.node)
              .map((article, index) => (
                <Column sm={12} md={12} lg={6} key={index}>
                  <Article article={article} />
                </Column>
              ))}
          </Row>
        </section>
        <br style={{ lineHeight: 3 }} />
        <HeaderOnlySection
          data={{
            type: "headerOnlySection",
            mainHeader: "Archiv",
            subHeader: "",
            divider: true,
            sectionId: "archiv",
          }}
        />
        <AccordionSection
          data={{
            type: "accordionSection",
            items: data.archivedArticles.edges
              .map((edge) => edge.node)
              .map((article) => ({
                header: article.mainHeader,
                text:
                  (article.subHeader ? `### ${article.subHeader}\n\n` : "") +
                  `${article.text.substring(
                    0,
                    422
                  )} [mehr erfahren...](/aktuelles${article.fields.slug})`,
              })),
          }}
        />
      </Layout>
    </>
  );
};

export default Articles;

const Article: FunctionComponent<{ article: ArticleData }> = ({ article }) => {
  return (
    <div className={styles.articleCard}>
      <div className={styles.thumbnail}>
        {article.thumbnail.image && (
          <Link to={article.fields.slug.substring(1)}>
            <GatsbyImage
              image={getImage(article.thumbnail.image) as IGatsbyImageData}
              alt={article.thumbnail.altText}
            />
          </Link>
        )}
      </div>
      <div className={styles.cardBody}>
        <h1 className={styles.cardHeadline}>{article.mainHeader}</h1>
        <hr className={styles.divider} />
        <div style={{ position: "relative" }}>
          <Clamp
            lines={3}
            withToggle
            showMoreElement={() => (
              <Link
                className={styles.seeMoreLink}
                to={article.fields.slug}
              >
                mehr erfahren...
              </Link>
            )}
          >
            <p style={{ marginBottom: 0 }}>
              <span className={styles.creationDate}>
                {article.creationDate}
              </span>
              {" / "}
              {article.text.substring(0, 300)}
            </p>
          </Clamp>
        </div>
      </div>
    </div>
  );
};

const ARTICLES_QUERY = graphql`
  query ArticlesQuery {
    currentArticles: allArticlesJson(limit: 4) {
      ...Articles
    }
    archivedArticles: allArticlesJson(skip: 4, limit: 10) {
      ...Articles
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

  fragment Articles on ArticlesJsonConnection {
    edges {
      node {
        id
        title
        thumbnail {
          altText
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                layout: FULL_WIDTH
                aspectRatio: 2
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
  }
`;
