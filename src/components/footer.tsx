import React, { FunctionComponent } from "react";
import Link from 'next/link';

import styles from "./footer.module.scss";

import Image from "next/image";

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
              <Link href="#">
                <a>
                  FAQ
                </a>
              </Link>
            </h1>
            <h1>
              <Link href="#">
                <a>
                  Unterstützen
                </a>
              </Link>
            </h1>
            <h1>
              <Link href="#">
                <a>
                  Karriere
                </a>
              </Link>
            </h1>
          </div>
          <div className={styles.footerColumn}>
            <h1>Partner</h1>
            <div className={styles.logoContainer}>
              <a href="https://www.zeiss.de">
                <Image src="/zeiss-logo.svg" alt="Zeiss" width={44} height={44}/>
              </a>
              <a href="https://www.hs-aalen.de">
                <Image src="/hs-aalen-logo.svg" alt="Hochschule Aalen" width={177} height={22}/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContainer}>
          <Link href="#">
            <a>
              Impressum
            </a>
          </Link>
          <Link href="#">
            <a>
              Datenschutz
            </a>
          </Link>
          <Link href="#">
            <a>
              Haftungsausschluss
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
