import React, { FunctionComponent } from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import MainContent from "../components/main-content";
import IconBubble from "../components/icon-bubble";

import "./index.scss";

const FrontPageHeader = styled.h1`
  font-size: 4.375em;
  font-weight: bold;
  margin-top: 0px;
`;

const IndexPage: FunctionComponent<PageProps> = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "front-page-1.png" }) {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            layout: FULL_WIDTH
          )
        }
      }
    }
  `);

  return (
    <Layout location={location} image={data.file} imageAlt="">
      <MainContent location={location}>
        <FrontPageHeader>Das Schülerforschungszentrum der Hochschule Aalen</FrontPageHeader>
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
