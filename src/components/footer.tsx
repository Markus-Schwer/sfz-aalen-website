import { Link } from "gatsby";
import React, { FunctionComponent } from "react";

import * as styles from "./footer.module.scss";

import ZeissLogo from "../images/zeiss-logo.svg";
import HSAalenLogo from "../images/hs-aalen-logo.svg";

const Footer: FunctionComponent<any> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerMainContainer}>
          <div className={styles.footerColumn}>
            <h1>Schülerforschungszentrum der Hochschule Aalen</h1>
            Beethovenstraße 1
            <br/>
            73430 Aalen
            <br/>
            Baden-Württemberg
            <br/>
            Telefon +49 7361 576-1802
            <br/>
            E-Mail info@sfz-aalen.de
            <br/>
          </div>
          <div className={styles.footerColumn}>
            <h1>Öffnungszeiten</h1>
            Während der Schulzeit
            <br/>
            Samstag 13.00 –17.00 Uhr
            <br/>
          </div>
          <div className={styles.footerColumn}>
            <h1>
              <Link to="#">
                FAQ
              </Link>
            </h1>
            <h1>
              <Link to="#">
                Unterstützen
              </Link>
            </h1>
            <h1>
              <Link to="#">
                Karriere
              </Link>
            </h1>
          </div>
          <div className={styles.footerColumn}>
            <h1>Partner</h1>
            <div className={styles.logoContainer}>
              <a href="https://www.zeiss.de">
                <ZeissLogo width={44} />
              </a>
              <a href="https://www.hs-aalen.de">
                <HSAalenLogo width={177} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContainer}>
          <Link to="#">
              Impressum
          </Link>
          <Link to="#">
              Datenschutz
          </Link>
          <Link to="#">
              Haftungsausschluss
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
