import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "styles/components/Footer.styles";
import appContext from "services/appContext";
import UnstoppableLight from "images/unstoppable-domains-logo-light.svg";
import UnstoppableDark from "images/unstoppable-domains-logo-dark.svg";

const Footer: React.FunctionComponent = () => {
  const classes = useStyles();
  const { state } = React.useContext(appContext);
  return (
    <div className={classes.footer}>
      <div className={classes.logosContainer}>
        <img
          className={classes.logo}
          alt="Unstoppable Domains Logo"
          src={
            state.theme.palette.type === "dark"
              ? UnstoppableDark
              : UnstoppableLight
          }
        />
        <img className={classes.logo} alt="3Box Logo" />
      </div>
      <div className={classes.creditContainer}>
        <Typography className={classes.creditText}>
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
