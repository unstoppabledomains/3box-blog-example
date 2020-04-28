import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useStyles from "styles/components/Footer.styles";

interface Props {
  description: string;
  title: string;
}

const Footer: React.FunctionComponent<Props> = ({ description, title }) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
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
      </Container>
    </footer>
  );
};

export default Footer;
