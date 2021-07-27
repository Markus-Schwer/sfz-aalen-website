import React, { FunctionComponent } from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import MainContent from "../components/main-content";
import IconBubble from "../components/icon-bubble";
import FullWidthSection from "../components/full-width-section";

import IconMicroscope from "../images/microscope.svg";
import IconEinstein from "../images/einstein.svg";
import IconPlanet from "../images/planet.svg";
import IconLightBulb from "../images/light-bulb.svg";

import "./index.scss";

const IndexPage: FunctionComponent<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "front-page-1.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  `);

  return (
    <Layout location={location} image={data.file} imageAlt="">
      <MainContent location={location}>
        <h1 className="front-page-header">
          Das Schülerforschungszentrum der Hochschule Aalen
        </h1>
        <p className="front-page-text">
          Interessierst du dich dafür, wie Dinge funktionieren? Tüftelst,
          experimentierst und forscht du gerne? Dann bist du bei uns richtig!
        </p>
        <div className="icon-bubble-container">
          <IconBubble
            icon={<IconMicroscope />}
            text="Mitmachen"
            color="tertiary"
            to="#"
          />
          <IconBubble
            icon={<IconEinstein />}
            text="Projekte"
            color="primary"
            to="#"
          />
          <IconBubble
            icon={<IconPlanet />}
            text="Workshops"
            color="secondary"
            to="#"
          />
          <IconBubble
            icon={<IconLightBulb />}
            text="Aktuelles"
            color="tertiary"
            to="#"
          />
        </div>

        <FullWidthSection className="colored-section">
          <h1>Die Idee</h1>
          <h2>
            Unser Schülerforschungszentrum der Hochschule Aalen, gefördert durch
            die Carl ZEISS AG, bietet MINT-interessierten Jugendlichen einen
            professionellen Rahmen und einen Raum für eigene, kreative
            Forschung.
          </h2>
          <hr className="inverted" />
        </FullWidthSection>

        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </MainContent>
    </Layout>
  );
};

export default IndexPage;
