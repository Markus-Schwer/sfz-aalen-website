import React, { FunctionComponent } from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import FullWidthSection from "../components/full-width-section";

import HeaderOnlySection from "../components/sections/header-only-section";
import { PageData } from "../../gatsby-node";
import { Column, Row } from "../components/grid";
import Card from "../components/card";
import BannerSection from "../components/sections/banner-section";

const StyledColumn = styled(Column)`
  padding-top: 0;
  padding-bottom: 0;
`;

type WorkshopsProps = {
}

const Workshops: FunctionComponent<WorkshopsProps> = (props) => {
  const pageData: PageData = {
    path: "workshops",
    title: "Workshops",
    breadcrumbs: ["Workshops"],
    previewThumbnails: ["images/uploads/workshops-thumbnail.jpg"],
    motto: [
      {
        text: "Hammer",
        size: "medium",
        color: "secondary"
      },
      {
        text: "Hightech",
        size: "big",
        color: "primary"
      },
      {
        text: "Begeistert!",
        size: "small",
        color: "tertiary"
      }
    ],
    pageSections: []
  };
  return (
    <Layout pageData={pageData}>
      <HeaderOnlySection data={{
        type: "headerOnlySection",
        mainHeader: "Aktuelle Workshops",
        subHeader: "Manchmal weiß man noch nicht genau, woran man forschen möchte. Eine Idee, in welche Richtung es gehen könnte, liefert vielleicht der Besuch eines Workshops.",
        divider: true,
        sectionId: "aktuelle-workshops"
      }} />
      <p style={{marginTop: "-1em"}}>
        Hier findet ihr Workshops, die nach Bedarf angeboten werden. Die Termine für die Workshops werden individuell abgesprochen
      </p>
      <FullWidthSection style={{backgroundColor: "#d4edfc"}}>
        <section>
          <Row>
            <StyledColumn sm={12} md={12} lg={12}>
              <Card
                mainHeader="Manche mögen's kalt – Was ist die Wohlfühltemperatur moderner Materialien?"
                subHeader="Für Schüler von 13–18 Jahren, Termine nach individueller Absprache. Arum ea denimus sandaecta sus dis aut Sequae doleceri re voluptate sequasp erspit re ad exceaquiant porpor accatur apid quam"
                previewImage="images/uploads/adobe-stock_427045284_bearb.jpg"
                imageAlt="Eis"
              >
                Hier könnte ihre Werbung stehen!
              </Card>
            </StyledColumn>
          </Row>
        </section>
      </FullWidthSection>
      <HeaderOnlySection data={{
        type: "headerOnlySection",
        mainHeader: "Anmeldung",
        subHeader: "Bei Interesse an einem der Workshops könnt ihr euch über das Anmeldeformular anmelden. Wir nehmen dann Kontakt mit euch auf.",
        divider: true,
        sectionId: "anmeldung"
      }} />
      <BannerSection data={{
        type: "bannerSection",
        color: "primary",
        mainText: "ZUFÄLLIG HOLZ ODER \nBAUTEILE ÜBRIG?",
        subText: "Wir freuen uns über sämtliche Materialien oder gebrauchte Geräte!"
      }} />
    </Layout>
  );
};

export default Workshops;

// export const query = graphql`
// `;
