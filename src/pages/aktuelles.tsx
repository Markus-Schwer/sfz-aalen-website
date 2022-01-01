import React, { FunctionComponent } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import Clamp from "react-multiline-clamp";

import { PageData } from "../page-data";
import * as styles from "./aktuelles.module.scss";

import { Layout, HeaderOnlySection, Column, Row, Card } from "../components";

type Article = {
  title: string;
  thumbnail: {
    image?: ImageDataLike;
    altText: string;
  };
  mainHeader: string;
  subHeader?: string;
  introduction?: string;
  creationDate: string; // YYYY-MM-DD
  text: string;
};

type ArticlesQuery = {
  allArticlesJson: {
    nodes: Article[];
  };
  thumbnails?: {
    nodes: ImageDataLike[];
  };
};

const ARTICLES_QUERY = graphql`
  query ArticlesQuery {
    allArticlesJson {
      nodes {
        title
        thumbnail {
          altText
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, aspectRatio: 2)
            }
          }
        }
        mainHeader
        subHeader
        introduction
        creationDate
        text
      }
    }
    thumbnails: allFile(
      filter: { relativePath: { eq: "images/uploads/front-page-1.jpg" } }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  }
`;

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
          {data.allArticlesJson.nodes.map((article, index) => (
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
    </Layout>
  );
};

export default Articles;

const Article: FunctionComponent<{ article: Article }> = ({ article }) => {
  return (
    <div className={styles.articleCard}>
      <div className={styles.thumbnail}>
        {article.thumbnail.image && (
          <GatsbyImage
            image={getImage(article.thumbnail.image) as IGatsbyImageData}
            alt={article.thumbnail.altText}
          />
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
              <Link className={styles.seeMoreLink} to="#">
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
