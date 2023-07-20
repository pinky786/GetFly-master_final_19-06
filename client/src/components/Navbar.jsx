import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Navbar = () => {
  return (
  

    <AppBar
    position="fixed"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: "white",
    }}
  >
    <Toolbar>
      <Typography
        variant="h6"
        noWrap
        component="div"
        color="black"
        sx={{ display: "flex", alignItems: "center", flexGrow: 13 }}
      >
        {/* <PersonIcon sx={{ marginRight: '8px' }} /> */}
        <Box
          component="img"
          sx={{
            height: 35,
            width: 35,
            maxHeight: { xs: 100, md: 100 },
            maxWidth: { xs: 100, md: 100 },
          }}
          alt="Logo"
              src="./logo1.png"
        />
        AcadeMate
      </Typography>
      <Typography
        variant="h6"
        noWrap
        component="div"
        color="black"
        sx={{ display: "flex", alignItems: "center" }}
        fontSize={"15px"}
      >
        {/* <DashboardIcon sx={{ marginLeft: '8px' }} /> */}
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <PersonIcon sx={{ marginRight: "8px", height: "20px" }} />
        Dashboard
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>

  );
};

export default Navbar;

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '10px',
  },
  navbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  navbarRight: {
    marginRight: '10px',
  },
  dashboard: {
    fontWeight: 'bold',
  },
};