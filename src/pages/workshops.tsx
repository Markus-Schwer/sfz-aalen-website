import React, { FunctionComponent } from "react";
import { graphql, PageProps } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { PageData } from "../page-data";
import * as styles from "./workshops.module.scss";

import {
  Layout,
  FullWidthSection,
  HeaderOnlySection,
  Column,
  Row,
  BannerSection,
  renderColumn,
  Card,
} from "../components";

const StyledColumn = styled(Column)`
  padding-top: 0;
  padding-bottom: 0;
`;

export type WorkshopsProps = {
  allWorkshopsJson: {
    nodes: {
      title: string;
      thumbnail: {
        image?: ImageDataLike;
        imageUrl?: string;
        previewImage?: string;
        altText: string;
      };
      header: string;
      numberColumns: number;
      columns: {
        type: "image" | "paragraph";
        altText: string;
        image?: ImageDataLike;
        imageUrl?: string;
        previewImage?: string;
        text: string;
      }[];
      footer: string;
    }[];
  };
  thumbnails?: {
    nodes: ImageDataLike[];
  };
  previewThumbnails?: string[];
};

const Workshops: FunctionComponent<PageProps<WorkshopsProps>> = ({ data }) => {
  const pageData: PageData = {
    path: "workshops",
    title: "Workshops",
    breadcrumbs: ["Workshops"],
    thumbnails: data.thumbnails?.nodes,
    previewThumbnails: data.previewThumbnails,
    motto: [
      {
        text: "Hammer",
        size: "medium",
        color: "secondary",
      },
      {
        text: "Hightech",
        size: "big",
        color: "primary",
      },
      {
        text: "Begeistert!",
        size: "small",
        color: "tertiary",
      },
    ],
    pageSections: [],
  };

  return (
    <Layout pageData={pageData}>
      <HeaderOnlySection
        data={{
          type: "headerOnlySection",
          mainHeader: "Aktuelle Workshops",
          subHeader:
            "Manchmal weiß man noch nicht genau, woran man forschen möchte. Eine Idee, in welche Richtung es gehen könnte, liefert vielleicht der Besuch eines Workshops.",
          divider: true,
          sectionId: "aktuelle-workshops",
        }}
      />
      <p style={{ marginTop: "-1em" }}>
        Hier findet ihr Workshops, die nach Bedarf angeboten werden. Die Termine
        für die Workshops werden individuell abgesprochen
      </p>
      <FullWidthSection style={{ backgroundColor: "#d4edfc" }}>
        <section>
          <Row>
            {data.allWorkshopsJson.nodes.map((workshop, index) => (
              <StyledColumn sm={12} md={12} lg={12} key={index}>
                <Card
                  header={workshop.header}
                  imageData={workshop.thumbnail.image}
                  previewImage={workshop.thumbnail.previewImage}
                  imageAlt={workshop.thumbnail.altText}
                >
                  <Row>
                    {workshop.columns?.map((column, index) =>
                      renderColumn(
                        column,
                        index,
                        workshop.numberColumns,
                        "#fff"
                      )
                    )}
                  </Row>
                  <hr className={styles.divider} />
                  <ReactMarkdown className={styles.workshopInfo}>
                    {workshop.footer}
                  </ReactMarkdown>
                </Card>
              </StyledColumn>
            ))}
          </Row>
        </section>
      </FullWidthSection>
      <HeaderOnlySection
        data={{
          type: "headerOnlySection",
          mainHeader: "Anmeldung",
          subHeader:
            "Bei Interesse an einem der Workshops könnt ihr euch über das Anmeldeformular anmelden. Wir nehmen dann Kontakt mit euch auf.",
          divider: true,
          sectionId: "anmeldung",
        }}
      />
      <BannerSection
        data={{
          type: "bannerSection",
          color: "primary",
          mainText: "ZUFÄLLIG HOLZ ODER \nBAUTEILE ÜBRIG?",
          subText:
            "Wir freuen uns über sämtliche Materialien oder gebrauchte Geräte!",
        }}
      />
    </Layout>
  );
};

export default Workshops;

export const query = graphql`
  query AllWorkshops {
    allWorkshopsJson {
      nodes {
        title
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
        header
        numberColumns
        columns {
          type
          altText
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
          text
        }
        footer
      }
    }
    thumbnails: allFile(
      filter: { relativePath: { eq: "images/uploads/workshops-thumbnail.jpg" } }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  }
`;
