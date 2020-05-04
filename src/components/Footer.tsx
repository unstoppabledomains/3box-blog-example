import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "styles/components/Footer.styles";

import Divider from "@material-ui/core/Divider";
import appContext from "services/appContext";
import SocialLogo from "./SocialLogo";
import { Socials } from "types/app";

interface Props {
  description: string;
  title: string;
}

const Footer: React.FunctionComponent<Props> = ({ description, title }) => {
  const classes = useStyles();
  const { state } = React.useContext(appContext);
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.socialRow}>
          {Object.keys(state.socials).map((key: string) =>
            key !== "iconColor" ? (
              <div className={classes.socialIcon}>
                <SocialLogo
                  logo={key as Socials}
                  iconColor={state.socials.iconColor}
                />
              </div>
            ) : null
          )}
        </div>
        <Divider className={classes.divider} />
        <Typography
          className={classes.textColor}
          variant="h6"
          align="center"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          className={classes.textColor}
          variant="subtitle1"
          align="center"
          component="p"
        >
          {description}
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
