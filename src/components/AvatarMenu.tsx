import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "styles/components/Header.styles";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import CustomIcon from "./CustomIcon";
import appContext from "services/appContext";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

interface Props {
  onLogout: () => void;
  profileImg: string;
  isAdmin: boolean;
}

const AvatarMenu: React.FunctionComponent<Props> = ({
  onLogout,
  profileImg,
  isAdmin,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { state } = React.useContext(appContext);
  const {
    theme: { palette },
    user: { walletAddress },
  } = state;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setOpen(false);
    onLogout();
  };

  const handleProfile = () => {
    window.open(`https://3box.io/${walletAddress}`, "_blank");
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };
  const handleAddPosts = () => {
    history.push("/new");
  };
  const handleDrafts = () => {
    history.push("/drafts");
  };

  return (
    <div>
      <Button
        ref={anchorRef}
        onClick={handleOpen}
        aria-controls="profile-menu"
        aria-haspopup="true"
        className={classes.avatarButton}
      >
        <Avatar src={profileImg} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="profile-menu"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleProfile}>
                    <div className={classes.menuIcon}>
                      <CustomIcon color={palette.text.primary} type="user" />
                    </div>
                    <Typography className={classes.menuItem}>
                      Profile
                    </Typography>
                  </MenuItem>
                  {isAdmin && (
                    <>
                      <MenuItem onClick={handleAddPosts}>
                        <div className={classes.menuIcon}>
                          <CustomIcon
                            color={palette.text.primary}
                            type="pencil-create"
                          />
                        </div>
                        <Typography className={classes.menuItem}>
                          Add Posts
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleDrafts}>
                        <div className={classes.menuIcon}>
                          <CustomIcon
                            color={palette.text.primary}
                            type="file-draft"
                          />
                        </div>
                        <Typography className={classes.menuItem}>
                          Drafts
                        </Typography>
                      </MenuItem>
                    </>
                  )}
                  <Divider className={classes.menuDivider} />
                  <MenuItem onClick={handleLogout}>
                    <div className={classes.menuIcon}>
                      <CustomIcon
                        color={palette.text.primary}
                        type="logout-circle"
                      />
                    </div>
                    <Typography className={classes.menuItem}>Logout</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AvatarMenu;
