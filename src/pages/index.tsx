import React, { FunctionComponent } from "react";
import Image from 'next/image';

import Layout from "../components/layout";
import MainContent from "../components/main-content";
import IconBubble from "../components/icon-bubble";
import FullWidthSection from "../components/full-width-section";

import styles from "./index.module.scss";
import mainContentStyles from "../components/main-content.module.scss";

const IndexPage: FunctionComponent<any> = () => {
  return (
    <Layout image="/front-page-1.png" imageAlt="" logoScrollEffect={true}>
      <MainContent>
        <section>
          <h1 className={styles.frontPageHeader}>
            Das Schülerforschungszentrum der Hochschule Aalen
          </h1>
          <p className={styles.frontPageText}>
            Interessierst du dich dafür, wie Dinge funktionieren? Tüftelst,
            experimentierst und forscht du gerne? Dann bist du bei uns richtig!
          </p>
          <div className={styles.iconBubbleContainer}>
            <IconBubble
              icon="/microscope.svg"
              text="Mitmachen"
              color="tertiary"
              href="#"
            />
            <IconBubble
              icon="/einstein.svg"
              text="Projekte"
              color="primary"
              href="#"
            />
            <IconBubble
              icon="/planet.svg"
              text="Workshops"
              color="secondary"
              href="#"
            />
            <IconBubble
              icon="/light-bulb.svg"
              text="Aktuelles"
              color="tertiary"
              href="#"
            />
          </div>
        </section>

        <FullWidthSection className={mainContentStyles.coloredSection}>
          <h1>Die Idee</h1>
          <h2>
            Unser Schülerforschungszentrum der Hochschule Aalen, gefördert durch
            die Carl ZEISS AG, bietet MINT-interessierten Jugendlichen einen
            professionellen Rahmen und einen Raum für eigene, kreative
            Forschung.
          </h2>
          <hr className={mainContentStyles.inverted} />
          <div className="row">
            <div className="col-6" style={{position: "relative", alignSelf: "stretch"}}>
              <Image src="/idea-offene-werkstatt.jpg" alt="offene werkstatt" layout="fill" objectFit="cover" />
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
