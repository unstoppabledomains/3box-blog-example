import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "styles/components/Header.styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import CustomIcon from "components/CustomIcon";
import { RoutingProps, TemplateSocials } from "types/app";
import { Palette } from "@material-ui/core/styles/createPalette";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props extends RoutingProps {
  title: string;
  loggedIn: boolean;
  isAdmin: boolean;
  socials: TemplateSocials;
  palette: Palette;
  loading: boolean;
  walletAddress: string | undefined;
  handleAddPost: () => void;
  handleLogout: () => void;
  handleLogin: () => void;
  handleBookmarks: () => void;
  handleSocials: (e: any) => void;
  toHome: () => void;
  logo?: string;
}

const MobileHeader: React.FunctionComponent<Props> = ({
  title,
  loggedIn,
  isAdmin,
  socials,
  palette,
  loading,
  walletAddress,
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
  const [open, setOpen] = React.useState<boolean>(false);

  const handleWebsite = () => handleSocials("website");
  const handleFacebook = () => handleSocials("facebook");
  const handleInstagram = () => handleSocials("instagram");
  const handleTwitter = () => handleSocials("twitter");
  const handleTelegram = () => handleSocials("telegram");
  const handleLinkedIn = () => handleSocials("linkedIn");
  const handleMedium = () => handleSocials("medium");
  const handleYouTube = () => handleSocials("youTube");

  const toggleOpen = () => setOpen((o) => !o);

  const handleProfile = () => {
    window.open(`https://3box.io/${walletAddress}`, "_blank");
  };
  const handleDrafts = () => {
    handleRoute("drafts");
  };

  return (
    <>
      <div className={classes.mobileRow}>
        <div className={classes.leftContainer}>
          <IconButton
            className={classes.menuButton}
            onClick={toggleOpen}
            edge="start"
            color="inherit"
          >
            <MenuIcon color="inherit" />
          </IconButton>
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
        </div>
        {!loggedIn &&
          (loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button
              variant="contained"
              className={classes.mobileButton}
              onClick={handleLogin}
              color="secondary"
            >
              <LockIcon />
            </Button>
          ))}
      </div>
      <Drawer className={classes.drawer} open={open} onClose={toggleOpen}>
        <List>
          {loggedIn && (
            <>
              <ListItem button onClick={handleProfile}>
                <ListItemIcon>
                  <CustomIcon color={palette.text.primary} type="user" />
                </ListItemIcon>
                <Typography className={classes.menuItem}>Profile</Typography>
              </ListItem>
              <ListItem button onClick={handleBookmarks}>
                <ListItemIcon>
                  <CustomIcon color={palette.text.primary} type="bookmarks" />
                </ListItemIcon>
                <ListItemText primary="Bookmarks" />
              </ListItem>
            </>
          )}
          {isAdmin && (
            <>
              <ListItem button onClick={handleAddPost}>
                <ListItemIcon>
                  <CustomIcon
                    color={palette.text.primary}
                    type="pencil-create"
                  />
                </ListItemIcon>
                <Typography className={classes.menuItem}>Add Posts</Typography>
              </ListItem>
              <ListItem button onClick={handleDrafts}>
                <ListItemIcon>
                  <CustomIcon color={palette.text.primary} type="file-draft" />
                </ListItemIcon>
                <Typography className={classes.menuItem}>Drafts</Typography>
              </ListItem>
            </>
          )}
          {loggedIn && (
            <>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <CustomIcon
                    color={palette.text.primary}
                    type="logout-circle"
                  />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem>
            <span className={classes.socialHeader}>Social Media</span>{" "}
          </ListItem>
          {socials.hasWebsite && (
            <ListItem id="website" onClick={handleWebsite}>
              <ListItemIcon>
                <CustomIcon type="website" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="Website" />
            </ListItem>
          )}
          {socials.hasFacebook && (
            <ListItem id="facebook" onClick={handleFacebook}>
              <ListItemIcon>
                <CustomIcon type="facebook" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </ListItem>
          )}
          {socials.hasInstagram && (
            <ListItem id="instagram" onClick={handleInstagram}>
              <ListItemIcon>
                <CustomIcon type="instagram" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="Instagram" />
            </ListItem>
          )}
          {socials.hasTwitter && (
            <ListItem id="twitter" onClick={handleTwitter}>
              <ListItemIcon>
                <CustomIcon type="twitter" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="Twitter" />
            </ListItem>
          )}
          {socials.hasTelegram && (
            <ListItem id="telegram" onClick={handleTelegram}>
              <ListItemIcon>
                <CustomIcon type="telegram" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="Telegram" />
            </ListItem>
          )}
          {socials.hasLinkedIn && (
            <ListItem id="linkedIn" onClick={handleLinkedIn}>
              <ListItemIcon>
                <CustomIcon type="linkedIn" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </ListItem>
          )}
          {socials.hasMedium && (
            <ListItem id="medium" onClick={handleMedium}>
              <ListItemIcon>
                <CustomIcon type="medium" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="Medium" />
            </ListItem>
          )}
          {socials.hasYouTube && (
            <ListItem id="youTube" onClick={handleYouTube}>
              <ListItemIcon>
                <CustomIcon type="youTube" color={palette.text.primary} />
              </ListItemIcon>
              <ListItemText primary="YouTube" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default MobileHeader;
