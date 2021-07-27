import React, { FunctionComponent, useLayoutEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import "./header.scss";

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
  logoScrollEffect?: boolean
};

const Header: FunctionComponent<HeaderProps> = ({
  logoScrollEffect = false,
}) => {
  const [logoState, setLogoState] = useState(logoScrollEffect ? 1 : 0);

  if (logoScrollEffect) {
    useLayoutEffect(() => {
      const onScroll = () => {
        const percent = range(0, 184, 1, 0, window.scrollY);
        setLogoState(percent);
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
  }

  return (
    <div className="header">
      <div className="header-content">
        {/* only who scroll effect on front page */}
        <StyledLogo percent={logoState} />
        <StyledLogoText percent={logoState} />
        <nav>
          <div className="dropdown">
            <Link to="/#">Home</Link>
            <DropdownCaret className="dropdown-icon" />
            <div className="dropdown-content">
              <Link to="/somepagecomponent">Schuelerforschungszentrum</Link>
              <Link to="/#">Idee</Link>
              <Link to="/#">Team</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/#">Mitmachen</Link>
            <DropdownCaret className="dropdown-icon" />
            <div className="dropdown-content">
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/#">Projekte</Link>
            <DropdownCaret className="dropdown-icon" />
            <div className="dropdown-content">
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/#">Workshops</Link>
            <DropdownCaret className="dropdown-icon" />
            <div className="dropdown-content">
              <Link to="/#">Link 1</Link>
              <Link to="/#">Link 2</Link>
              <Link to="/#">Link 3</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/#">Aktuelles</Link>
            <DropdownCaret className="dropdown-icon" />
            <div className="dropdown-content">
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
