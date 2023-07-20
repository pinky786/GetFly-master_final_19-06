import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorageIcon from '@mui/icons-material/Storage';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = () => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return currentTime.toLocaleString('en-US', options);
  };

  const handleGenerateReport = async () => {
    if (selectedReport) {
      try {
        const response = await fetch('http://localhost:3000/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reportType: selectedReport }),
        });

        if (response.ok) {
          const data = await response.json();
          setReportData(data);
        } else {
          throw new Error('Error: ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReportSelection = (e) => {
    setSelectedReport(e.target.value);
  };
  const currentDate = new Date();
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  const options1 = {weekday: 'long'}
  const formatteDay = currentDate.toLocaleDateString(undefined,options1)
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const formattedTime = currentDate.toLocaleTimeString();

  const userName = "User"; // Change this to the actual user name or greeting

 
  return (

    <Box sx={{ display: "dynamic" ,marginTop:60}}>
<CssBaseline />


<Box component="main" sx={{ flexGrow: 1 }}>
  <Toolbar />
  <Box sx={{ textAlign: "left", mb: 2, ml: 5,mt:-60}}>
    <Typography variant="h4" component="div"  sx={{display:"flex",justifyContent: "flex-right",}}>
    Hello, {localStorage.userName}!
      
      <Typography variant="subtitle1" component="div" sx={{ display: 'flex', justifyContent: 'flex-end', ml: 70}}>
      {formattedDate}<br/>
      {formatteDay}<br/>
      {formattedTime}
    </Typography>
    </Typography>
  </Box>
    <hr style={{ margin: '0 auto' }} />



 <h2>Generate Report</h2>
    <label htmlFor="report">Select Report:</label>
    <select id="report" onChange={handleReportSelection}>
      <option value="">Select a report</option>
      <option value="due-dated">Due Date wise</option>
      <option value="daily-issued">Daily book issued</option>
      <option value="daily-reissued">Daily book reissued</option>
      <option value="monthly-issued">Monthly book issued</option>
      <option value="monthly-reissued">Monthly book reissued</option>
      <option value="lost-book">Lost book</option>
      
      <option value="circulated-book">Circulated book</option>
      <option value="year-issued">Year wise book issued</option> // Added option for year-issued
    </select>
    <button onClick={handleGenerateReport}>Generate Report</button>
  
  {reportData.length > 0 && (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Book ID</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>SID</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Issued Date</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((item) => (
          <tr key={item.book_id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.book_id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.sid}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.issued_date}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.due_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

   

  
</Box> 
</Box>

);
};

export default MainContent;
