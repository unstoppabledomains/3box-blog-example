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
import { BlogPost } from "types/blog";

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
  post: BlogPost;
}

const PostPreview: React.FunctionComponent<Props> = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  //   TODO: When just hash use `pinata.cloud/${hash}`
  const { title, createdAt, description, assetsHash, id } = post;
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
                {new Date(createdAt).toString()}
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
            {/* TODO When just hash use `pinata.cloud/${hash}` */}
            <CardMedia className={classes.cardMedia} image={assetsHash} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default PostPreview;
