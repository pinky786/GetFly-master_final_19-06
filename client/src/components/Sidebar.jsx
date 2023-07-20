import React, { useState } from 'react';
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

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Sidebar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const drawerWidth = 240;

  return (
   

    <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        backgroundColor: "lightgrey",
      },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: "auto" }}>
      <List>
     
        <ListItem disablePadding onClick={toggleOptions}>
          <ListItemIcon>
            <AssignmentIcon/>
          </ListItemIcon>
          <ListItemText primary="Master Tab" />
        </ListItem>
        {showOptions && (
          <React.Fragment>
            <ListItem disablePadding  >
              
            <ListItemText
  primary={
    <Link to='/addbooks' style={{ color: 'black', textDecoration: 'none' }}>
       Add Books
    </Link>
  }
  sx={{
    textAlign: 'center',
  }}
/>

          
            </ListItem>
          </React.Fragment>
        )}
       
        <ListItem disablePadding>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          {/* <ListItemText  primary="Generate Receipts" /> */}
          <ListItemText primary={<Link to='/issuebooks' style={{ color: 'black', textDecoration: 'none'}}>Issue Books</Link> }  sx={{
  }}/> 
  </ListItem>

<ListItem disablePadding>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          {/* <ListItemText  primary="Generate Receipts" /> */}
          <ListItemText primary={<Link to='/reissuebooks' style={{ color: 'black', textDecoration: 'none'}}>Reissue Books</Link> }  sx={{
  }}/> 
  </ListItem>



   
  <ListItem disablePadding>
  <ListItemIcon>
    <StorageIcon />
  </ListItemIcon>
  {/* <ListItemText  primary="Generate Receipts" /> */}
  <ListItemText primary={<Link to='/report' style={{ color: 'black', textDecoration: 'none'}}>Generate Receipts</Link> }  sx={{

}}/>
</ListItem>


        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
  <Button
    variant="contained"
    color="primary"
    size="small"
    startIcon={<ExitToAppIcon />}
    onClick={() => { localStorage.clear();
      navigate('/')}}
  >
    Logout
  </Button>
</Box>


      </List>
    </Box>
  </Drawer>
  );
};

export default Sidebar;

