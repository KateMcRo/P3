import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button, ListItem } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { NavLink } from "react-router-dom";
// get he house/home icon from material ui
import {
  House as HouseIcon,
  LoginOutlined,
  Notifications,
  Outbound,
  Person2,
  Person3Outlined,
  PersonAddAlt1,
  Person2Rounded as PersonIcon,
  Search,
  LocalFlorist,
} from "@mui/icons-material/";
import useAuthService from "../utils/authHook";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
export default function Header() {
  const { toggleDrawer, navStates } = useNavHandlers();
  const open = navStates.drawerOpen;
  return (
    <>
      <Nav open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
const useNavHandlers = () => {
  const [navStates, setNavStates] = React.useState({
    drawerOpen: false,
  });
  const openDrawer = () => setNavStates({ ...navStates, drawerOpen: true });
  const closeDrawer = () => setNavStates({ ...navStates, drawerOpen: false });
  const toggleDrawer = () =>
    setNavStates((oldNavStates) => ({
      ...oldNavStates,
      drawerOpen: !oldNavStates.drawerOpen,
    }));
  return { openDrawer, closeDrawer, navStates, toggleDrawer };
};

function Nav(
  /** @type{{open:boolean,toggleDrawer:(e?:React.SyntheticEvent)=>any}}*/ {
    open,
    toggleDrawer,
  }
) {
  const Auth = useAuthService();
  function handleLogout() {
    Auth.logout();
  }
  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            bgcolor: "#013927",
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Plantastic
          </Typography>
          <IconButton color="inherit">
          </IconButton>

          <IconButton color="inherit" disabled={!Auth.isLoggedIn()}
            // onClick={(e) => {
            //   e.preventDefault();
            //   <NavLink to="/accountInfo" />;
            // }}
          >
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* {mainListItems} */}
          {/* {secondaryListItems} */}
          <ListItem>
            <NavLink to={Auth.isLoggedIn() ? "/mygarden" : "/"}>
              <Button
                variant="text"
                startIcon={Auth.isLoggedIn() ? <LocalFlorist /> : <HouseIcon />}
                color="success"
                sx={{ marginLeft: "-10px" }}
              >
                {open ? Auth.isLoggedIn() ? "My Garden" : "Home" : <></>}
              </Button>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/search">
              <Button
                variant="text"
                startIcon={<Search />}
                color="success"
                sx={{ marginLeft: "-10px" }}
              >
                {open ? <span>Search</span> : <></>}
              </Button>
            </NavLink>
          </ListItem>
          {!Auth.isLoggedIn() && (
            <ListItem>
              <NavLink to="/signup">
                <Button
                  variant="text"
                  startIcon={<PersonIcon />}
                  color="success"
                  sx={{ marginLeft: "-10px" }}
                >
                  {open ? <span>Sign up</span> : <></>}
                </Button>
              </NavLink>
            </ListItem>
          )}
          <ListItem>
            <NavLink
              onClick={(e) => {
                e.preventDefault();
                Auth.logout();
              }}
            >
              <Button
                variant="text"
                startIcon={<Outbound />}
                color="success"
                onClick={handleLogout}
                sx={{ marginLeft: "-10px" }}
              >
                {open ? <span>Log out</span> : <></>}
              </Button>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
