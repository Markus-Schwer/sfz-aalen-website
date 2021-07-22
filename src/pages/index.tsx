import React, { FunctionComponent } from "react";
import { PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

import Layout from "../components/layout";
import MainContent from "../components/main-content";

import "./index.scss";

const FrontPageHeader = styled.h1`
  font-size: 4.375em;
  font-weight: bold;
  margin-top: 0px;
`;

const IndexPage: FunctionComponent<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <StaticImage
        className="front-page-image"
        src="../images/front-page-1.png"
        placeholder="blurred"
        layout="fullWidth"
        alt=""
      />
      <MainContent location={location}>
        <FrontPageHeader>Das Schülerforschungszentrum der Hochschule Aalen</FrontPageHeader>

        <div className="lorem-ipsum">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </MainContent>
    </Layout>
  );
};

export default IndexPage;
