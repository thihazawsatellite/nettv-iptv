import * as React from "react";
import PropTypes from "prop-types";

// Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlaylistAddTwoToneIcon from "@mui/icons-material/PlaylistAddTwoTone";
import LinkIcon from "@mui/icons-material/Link";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

// Hooks
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Page(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [remotePlaylistDialogOpen, setRemotePlaylistDialogOpen] =
    React.useState(false);
  const [remotePlaylistUrl, setRemotePlaylistUrl] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemotePlaylistDialogOpen = () => {
    setAnchorEl(null);
    setRemotePlaylistDialogOpen(true);
  };
  const handlePlaylistUrlChange = (event) => {
    setRemotePlaylistUrl(event.target.value);
  };
  const handleAddRemotePlaylistCancel = () => {
    setRemotePlaylistDialogOpen(false);
  };
  const handleAddRemotePlaylistTrigger = () => {
    setRemotePlaylistDialogOpen(false);
    console.log(remotePlaylistUrl);
  };

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/playlists")}>
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText primary="Playlists" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {props.hasAddPlaylistMenu ? (
            <>
              <IconButton
                size="large"
                aria-label="add a playlist"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PlaylistAddTwoToneIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleRemotePlaylistDialogOpen}>
                  <ListItemIcon>
                    <LinkIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add from remote URL</ListItemText>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemIcon>
                    <PhoneAndroidIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add file from device</ListItemText>
                </MenuItem>
              </Menu>
              <Dialog
                open={remotePlaylistDialogOpen}
                onClose={handleAddRemotePlaylistCancel}
              >
                <DialogTitle>Add a playlist from remote URL</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="url"
                    autoComplete="off"
                    label="Playlist URL"
                    type="url"
                    fullWidth
                    variant="standard"
                    onChange={handlePlaylistUrlChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddRemotePlaylistCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRemotePlaylistTrigger}>Ok</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <SwipeableDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

Page.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Page;
