import React, { FunctionComponent } from "react";
import { Link } from "gatsby";
import useDarkMode from "use-dark-mode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import * as styles from "./footer.module.scss";

import ZeissLogo from "../images/zeiss-logo.svg";
import HSAalenLogo from "../images/hs-aalen-logo.svg";
import { Column, Row } from "./grid";

const Footer: FunctionComponent<any> = () => {
  const darkMode = useDarkMode();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerMainContainer}>
          <Row className={styles.footerRow} alignItems="Stretch">
            <Column sm={12} md={6} lg={3} className={styles.footerColumn}>
              <h1>Schülerforschungszentrum der Hochschule Aalen</h1>
              Beethovenstraße 1
              <br />
              73430 Aalen
              <br />
              Baden-Württemberg
              <br />
              Telefon +49 7361 576-1802
              <br />
              E-Mail info@sfz-aalen.de
              <br />
            </Column>
            <Column sm={12} md={6} lg={3} className={styles.footerColumn}>
              <h1>Öffnungszeiten</h1>
              Während der Schulzeit
              <br />
              Samstag 13.00 –17.00 Uhr
              <br />
            </Column>
            <Column sm={12} md={6} lg={3} className={styles.footerColumn}>
              <h1>
                <Link to="/faq">FAQ</Link>
              </h1>
              <h1>
                <Link to="/unterstuetzen">Unterstützen / Karriere</Link>
              </h1>
              <h1>
                <a href="/admin">CMS</a>
              </h1>
            </Column>
            <Column sm={12} md={6} lg={3} className={styles.footerColumn}>
              <h1>Partner</h1>
              <div className={styles.logoContainer}>
                <a href="https://www.zeiss.de">
                  <ZeissLogo width={44} />
                </a>
                <a href="https://www.hs-aalen.de">
                  <HSAalenLogo width={177} />
                </a>
              </div>
            </Column>
          </Row>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContainer}>
          <DarkModeSwitch
            className={styles.darkModeSwitch}
            checked={darkMode.value}
            onChange={darkMode.toggle}
            size={18}
            sunColor="var(--text-color-light)"
          />
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <Link to="/haftungsausschluss">Haftungsausschluss</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
