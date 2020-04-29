import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "styles/components/Footer.styles";
import FacebookLogo from "images/facebook.svg";
import InstagramLogo from "images/instagram.svg";
import LinkedInLogo from "images/linkedIn.svg";
import MediumLogo from "images/medium.svg";
import TelegramLogo from "images/telegram.svg";
import TwitterLogo from "images/twitter.svg";
import Divider from "@material-ui/core/Divider";

interface Props {
  description: string;
  title: string;
}

const Footer: React.FunctionComponent<Props> = ({ description, title }) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.socialRow}>
          <img
            alt="facebook"
            src={FacebookLogo}
            className={classes.socialIcon}
          />
          <img
            alt="instagram"
            src={InstagramLogo}
            className={classes.socialIcon}
          />
          <img
            alt="linkedIn"
            src={LinkedInLogo}
            className={classes.socialIcon}
          />
          <img alt="medium" src={MediumLogo} className={classes.socialIcon} />
          <img
            alt="telegram"
            src={TelegramLogo}
            className={classes.socialIcon}
          />
          <img alt="twitter" src={TwitterLogo} className={classes.socialIcon} />
        </div>
        <Divider style={{ margin: 16 }} className={classes.divider} />
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
