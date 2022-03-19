import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import * as styles from "./header.module.scss";

import Logo from "../images/logo.svg";
import LogoText from "../images/logo-text.svg";
import DropdownCaret from "../images/dropdown-caret.svg";
import { range } from "../utils";

const MobileLogo = styled(Logo)`
  fill: var(--text-color);
  position: absolute;
  margin-top: 1.6875em;
  margin-left: 2.875em;
  height: 4.125em;
`;

const StyledLogo = styled(Logo)`
  fill: var(--text-color);
  position: absolute;
  margin-top: ${(props) => range(1, 0, 64, 27, props.percent)}px;
  margin-left: ${(props) => range(1, 0, 16, 46, props.percent)}px;
  height: ${(props) => range(1, 0, 184, 66, props.percent)}px;
  display: ${(props) => (props.percent > 0 ? "block" : "none")};
`;

const StyledLogoText = styled(LogoText)`
  fill: var(--text-color);
  position: absolute;
  margin-top: 27px;
  margin-left: 46px;
  height: 66px;
  display: ${(props) => (props.percent > 0 ? "none" : "block")};
`;

type HeaderProps = {
  logoScrollEffect?: boolean;
  navigationData: {
    categories: {
      name: string;
      href?: string;
      links?: {
        name: string;
        href: string;
      }[];
    }[];
  };
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
  navigationData,
}) => {
  const breakpoints = useBreakpoint();
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
          <>
            {!breakpoints.sm && <ScrollingLogo />}
            {breakpoints.sm && <MobileLogo />}
          </>
        ) : (
          <Link to="/home">
            {!breakpoints.sm && <StyledLogoText percent={0} />}
            {breakpoints.sm && <MobileLogo />}
          </Link>
        )}
        <nav style={{display: breakpoints.md ? "none" : "flex"}}>
          {navigationData.categories.map((category, i) => 
            category.links ? (
              category.href ? (
                <div className={styles.dropdown} key={i}>
                  <Link to={category.href}>
                    {category.name}
                    <DropdownCaret className={styles.dropdownIcon} />
                  </Link>
                  <div className={styles.dropdownContent} key={i}>
                    {category.links.map((link, j) => (
                      <Link to={link.href} key={j}>{link.name}</Link>
                    ))}
                  </div>
                </div >
                ) : (
                  <div className={styles.dropdown} key={i}>
                    <a>
                      {category.name}
                    </a>
                    <div className={styles.dropdownContent} key={i}>
                      {category.links.map((link, j) => (
                        <Link to={link.href} key={j}>{link.name}</Link>
                      ))}
                    </div>
                  </div>
                )
            ) : (
              <Link to={category.href!!} key={i}>
                {category.name}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
