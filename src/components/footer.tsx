import { Link } from "gatsby";
import React, { FunctionComponent } from "react";

import "./footer.scss";

import ZeissLogo from "../images/zeiss-logo.svg";
import HSAalenLogo from "../images/hs-aalen-logo.svg";

const Footer: FunctionComponent<any> = () => {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-main-container">
          <div className="footer-column col-3">
            <h1>Schülerforschungszentrum der Hochschule Aalen</h1>
            <span className="new-line">Beethovenstraße 1</span>
            <span className="new-line">73430 Aalen</span>
            <span className="new-line">Baden-Württemberg</span>
            <span className="new-line">Telefon +49 7361 576-1802</span>
            <span className="new-line">E-Mail info@sfz-aalen.de</span>
          </div>
          <div className="footer-column col-3">
            <h1>Öffnungszeiten</h1>
            <span className="new-line">Während der Schulzeit:</span>
            <span className="new-line">Samstag 13.00 –17.00 Uhr</span>
          </div>
          <div className="footer-column col-3">
            <h1>
              <Link to="#">FAQ</Link>
            </h1>
            <h1>
              <Link to="#">Unterstützen</Link>
            </h1>
            <h1>
              <Link to="#">Karriere</Link>
            </h1>
          </div>
          <div className="footer-column col-3">
            <h1>Partner</h1>
            <div className="logo-container">
              <Link to="https://www.zeiss.de">
                <ZeissLogo width={44} />
              </Link>
              <Link to="https://www.hs-aalen.de">
                <HSAalenLogo width={177} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <Link to="#">Impressum</Link>
          <Link to="#">Datenschutz</Link>
          <Link to="#">Haftungsausschluss</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
