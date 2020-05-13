import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/components/Header.styles";
import AvatarMenu from "components/AvatarMenu";
import Divider from "@material-ui/core/Divider";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import CustomIcon from "components/CustomIcon";
import { RoutingProps, TemplateSocials } from "types/app";
import { Palette } from "@material-ui/core/styles/createPalette";

interface Props extends RoutingProps {
  title: string;
  loggedIn: boolean;
  isAdmin: boolean;
  socials: TemplateSocials;
  palette: Palette;
  loading: boolean;
  profileImg: string | undefined;
  handleAddPost: () => void;
  handleLogout: () => void;
  handleLogin: () => void;
  handleBookmarks: () => void;
  handleSocials: (id: string) => void;
  toHome: () => void;
  logo?: string;
}

const StandardHeader: React.FunctionComponent<Props> = ({
  title,
  loggedIn,
  isAdmin,
  socials,
  palette,
  loading,
  profileImg,
  handleAddPost,
  handleLogout,
  handleLogin,
  handleBookmarks,
  handleSocials,
  toHome,
  handleRoute,
  logo,
}) => {
  const classes = useStyles();
  const handleFacebook = () => handleSocials("facebook");
  const handleInstagram = () => handleSocials("instagram");
  const handleTwitter = () => handleSocials("twitter");
  const handleTelegram = () => handleSocials("telegram");
  const handleLinkedIn = () => handleSocials("linkedIn");
  const handleMedium = () => handleSocials("medium");

  return (
    <>
      <div className={classes.leftContainer}>
        {logo ? (
          <img
            src={`${process.env.PUBLIC_URL}/${logo}`}
            alt={title}
            className={classes.logo}
            onClick={toHome}
          />
        ) : (
          <Typography onClick={toHome} className={classes.title}>
            {title}
          </Typography>
        )}
        {loggedIn && (
          <>
            <Divider
              className={classes.bookmarksDivider}
              flexItem
              orientation="vertical"
            />
            <Button
              className={classes.bookmarksButton}
              variant="text"
              startIcon={
                <CustomIcon
                  color={palette.primary.contrastText}
                  type="bookmarks"
                />
              }
              onClick={handleBookmarks}
            >
              Bookmarks
            </Button>
          </>
        )}
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.socialRow}>
          {socials.hasFacebook && (
            <IconButton
              id="facebook"
              className={classes.socialIcon}
              onClick={handleFacebook}
            >
              <CustomIcon
                type="facebook"
                color={palette.primary.contrastText}
              />
            </IconButton>
          )}
          {socials.hasInstagram && (
            <IconButton
              id="instagram"
              className={classes.socialIcon}
              onClick={handleInstagram}
            >
              <CustomIcon
                type="instagram"
                color={palette.primary.contrastText}
              />
            </IconButton>
          )}
          {socials.hasTwitter && (
            <IconButton
              id="twitter"
              className={classes.socialIcon}
              onClick={handleTwitter}
            >
              <CustomIcon type="twitter" color={palette.primary.contrastText} />
            </IconButton>
          )}
          {socials.hasTelegram && (
            <IconButton
              id="telegram"
              className={classes.socialIcon}
              onClick={handleTelegram}
            >
              <CustomIcon
                type="telegram"
                color={palette.primary.contrastText}
              />
            </IconButton>
          )}
          {socials.hasLinkedIn && (
            <IconButton
              id="linkedIn"
              className={classes.socialIcon}
              onClick={handleLinkedIn}
            >
              <CustomIcon
                type="linkedIn"
                color={palette.primary.contrastText}
              />
            </IconButton>
          )}
          {socials.hasMedium && (
            <IconButton
              id="medium"
              className={classes.socialIcon}
              onClick={handleMedium}
            >
              <CustomIcon type="medium" color={palette.primary.contrastText} />
            </IconButton>
          )}
        </div>
        {isAdmin && (
          <Button
            variant="contained"
            className={classes.headerButton}
            onClick={handleAddPost}
            startIcon={<CreateIcon />}
            color="secondary"
          >
            Add Post
          </Button>
        )}
        {loading ? (
          <CircularProgress color="secondary" />
        ) : loggedIn ? (
          <AvatarMenu
            onLogout={handleLogout}
            profileImg={profileImg as string}
            isAdmin={isAdmin}
            handleRoute={handleRoute}
          />
        ) : (
          <Button
            variant="contained"
            className={classes.headerButton}
            onClick={handleLogin}
            color="secondary"
            startIcon={<LockIcon />}
          >
            Sign In
          </Button>
        )}
      </div>
    </>
  );
};

export default StandardHeader;
