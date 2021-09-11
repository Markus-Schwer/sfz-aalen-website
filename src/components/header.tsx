import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import * as styles from "./header.module.scss";

import Logo from "../images/logo.svg";
import LogoText from "../images/logo-text.svg";
import DropdownCaret from "../images/dropdown-caret.svg";

const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;
const clamp = (a: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, a));
const invlerp = (x: number, y: number, a: number): number =>
  clamp((a - x) / (y - x));
const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number
): number => lerp(x2, y2, invlerp(x1, y1, a));

const StyledLogo = styled(Logo)`
  position: absolute;
  margin-top: ${(props) => range(1, 0, 64, 27, props.percent)}px;
  margin-left: ${(props) => range(1, 0, 16, 46, props.percent)}px;
  height: ${(props) => range(1, 0, 184, 66, props.percent)}px;
  display: ${(props) => (props.percent > 0 ? "block" : "none")};
`;

const StyledLogoText = styled(LogoText)`
  position: absolute;
  margin-top: 27px;
  margin-left: 46px;
  height: 66px;
  display: ${(props) => (props.percent > 0 ? "none" : "block")};
`;

type HeaderProps = {
  logoScrollEffect?: boolean;
};

const ScrollingLogo: FunctionComponent<any> = ({}) => {
  const [logoState, setLogoState] = useState(
    range(0, 184, 1, 0, window.scrollY)
  );

  useLayoutEffect(() => {
    const onScroll = () => {
      const percent = range(0, 184, 1, 0, window.scrollY);
      setLogoState(percent);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <StyledLogo percent={logoState} />
      <StyledLogoText percent={logoState} />
    </>
  );
};

const Header: FunctionComponent<HeaderProps> = ({
  logoScrollEffect = false,
}) => {
  const [showDynamicLogo, setShowDynamicLogo] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowDynamicLogo(true);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {/* only who scroll effect on front page */}
        {logoScrollEffect && showDynamicLogo ? (
          <ScrollingLogo />
        ) : (
          <Link to="/home">
            <StyledLogoText percent={0} />
          </Link>
        )}
        <nav>
          <div className={styles.dropdown}>
            <Link to="/#">Home</Link>
            <DropdownCaret className={styles.dropdownIcon} />
            <div className={styles.dropdownContent}>
              <Link to="/#">Schuelerforschungszentrum</Link>
              <Link to="/#">Idee</Link>
              <Link to="/#">Team</Link>
            </div>
          </div>
          <div className={styles.dropdown}>
            <Link to="/#">Mitmachen</Link>
            <DropdownCaret className={styles.dropdownIcon} />
            <div className={styles.dropdownContent}>
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <div className={styles.dropdown}>
            <Link to="/#">Projekte</Link>
            <DropdownCaret className={styles.dropdownIcon} />
            <div className={styles.dropdownContent}>
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <div className={styles.dropdown}>
            <Link to="/#">Workshops</Link>
            <DropdownCaret className={styles.dropdownIcon} />
            <div className={styles.dropdownContent}>
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <div className={styles.dropdown}>
            <Link to="/#">Aktuelles</Link>
            <DropdownCaret className={styles.dropdownIcon} />
            <div className={styles.dropdownContent}>
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <Link to="/#">Kontakt</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
