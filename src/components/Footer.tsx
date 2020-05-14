import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "styles/components/Footer.styles";
import appContext from "services/appContext";
import UnstoppableDark from "images/unstoppable-domains-logo-dark.svg";
import UnstoppableLight from "images/unstoppable-domains-logo-light.svg";
import ThreeBoxDark from "images/three-box-logo-dark.svg";
import ThreeBoxLight from "images/three-box-logo-light.svg";
import { getThemeType } from "utils/createTheme";

const Footer: React.FunctionComponent = () => {
  const classes = useStyles();
  const { state } = React.useContext(appContext);
  const domainTag = state.domain.replace(".", "#");
  const { main } = state.theme.palette.primary;
  const themeType = getThemeType(main);
  const handleClick = () => {
    window.open("https://github.com/donald-stolz", "_blank");
  };

  return (
    <div className={classes.footer}>
      <div className={classes.logosContainer}>
        <a
          href={`https://unstoppabledomains.com/?ref=website_builder&utm_source=template&utm_medium=${domainTag}&utm_campaign=basic_blog`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={classes.unstoppableLogo}
            alt="Unstoppable Domains Logo"
            src={themeType === "light" ? UnstoppableDark : UnstoppableLight}
          />
        </a>
        <a href="https://3box.io/" target="_blank" rel="noopener noreferrer">
          <img
            alt="3Box Logo"
            src={themeType === "light" ? ThreeBoxDark : ThreeBoxLight}
          />
        </a>
      </div>
      <div className={classes.creditContainer}>
        <Typography
          onClick={handleClick}
          className={`${classes.creditText} ${classes.hover}`}
        >
          3Box Blog by Don Stolz
        </Typography>
        <Typography className={classes.creditText}>
          Brooklyn Theme by Aleksey Popov
        </Typography>
        <Typography className={classes.creditText}>
          Powered by Unstoppable Domains
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
