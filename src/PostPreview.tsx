import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex"
    },
    cardDetails: {
      flex: 1
    },
    cardMedia: {
      width: 160
    }
  })
);

interface Props {
  post: {
    title: string;
    date: string;
    description: string;
    image: any;
    imageTitle: string;
    id: number;
  };
}

const PostPreview: React.FunctionComponent<Props> = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const { title, date, description, image, imageTitle, id } = post;
  const handleClick = () => {
    console.log("click");
    history.push(`/blog/${id}`);
  };
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={handleClick}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={image}
              title={imageTitle}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default PostPreview;
