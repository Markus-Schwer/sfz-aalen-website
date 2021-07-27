import React, { FunctionComponent } from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
      frontPageImage: file(relativePath: { eq: "front-page-1.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
      ideaImage: file(relativePath: { eq: "idea-offene-werkstatt.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const ideaImage = getImage(data.ideaImage)!;

  return (
    <Layout image={data.frontPageImage} imageAlt="" logoScrollEffect={true}>
      <MainContent location={location}>
        <section>
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
        </section>

        <FullWidthSection className="colored-section">
          <h1>Die Idee</h1>
          <h2>
            Unser Schülerforschungszentrum der Hochschule Aalen, gefördert durch
            die Carl ZEISS AG, bietet MINT-interessierten Jugendlichen einen
            professionellen Rahmen und einen Raum für eigene, kreative
            Forschung.
          </h2>
          <hr className="inverted" />
          <div className="row">
            <div className="col-6">
              <GatsbyImage image={ideaImage} alt="offene werkstatt" />
            </div>
            <p className="col-6" style={{ margin: 0, lineHeight: "1.5625" }}>
              Bei uns geht die Beschäftigung mit MINT weit über den
              Schulunterricht hinaus und die Jugendlichen gehen selbstständig
              und eigenverantwortlich einer eigenen Forschungs-fragestellung auf
              den Grund. Sie entwickeln Problemstellungen und Hypothesen, planen
              Experimente und werten sie aus, erarbeiten Modelle, finden
              Erklärungen und hinterfragen diese kritisch.
              <br />
              <br />
              Die Jugendlichen arbeiten über längere Zeit in Teams zusammen und
              werden von kompetenten Mentoren unterstützt.
              <br />
              <br />
              Gerade für Jüngere oder Neueinsteiger gibt es die Möglichkeit, bei
              bestehenden Teams mitzuarbeiten, die sich bereits mit einem Thema
              auseinandersetzen; dadurch kommen sie leichter ins selbständige
              Forschen.
            </p>
          </div>
        </FullWidthSection>

        <section>
          <h1>Unser Team</h1>
          <h2>
            Unser Team besteht aus Schülern, Azubis, Lehrern, wissenschaftlichen Mitarbeitern und
          manchmal auch Studierenden, die ehrenamtlich für das SFZ tätig sind. Wir können euch
          in den Bereichen Informatik, 3D-Druck, Holz-/Metallbearbeitung, Physik und noch einiges
          mehr Unterstützung bieten. Wenn eure Fragen über unser Wissen und Können hinausge-
          hen, können wir Experten vermitteln.
          </h2>
          <hr />
        </section>
      </MainContent>
    </Layout>
  );
};

export default IndexPage;
