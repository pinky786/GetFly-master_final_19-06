import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState({
    bi: '',
    tb: '',
    bic: '',
    bri: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request failed with error:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = () => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return currentTime.toLocaleString('en-US', options);
  };

  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const options1 = { weekday: 'long' };
  const formattedDay = currentDate.toLocaleDateString(undefined, options1);
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const formattedTime = currentDate.toLocaleTimeString();

  // Change this to the actual user name or greeting

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,mt:10}}>
        <Box sx={{ textAlign: 'left', mb: 2, ml: 5 }}>
          <Typography variant="h4" component="div" sx={{ display: 'flex', justifyContent: 'flex-right' }}>
            Hello, {localStorage.userName}!

            <Typography variant="subtitle1" component="div" sx={{ display: 'flex', justifyContent: 'flex-end', ml: 70 }}>
              {formattedDate}
              <br />
              {formattedDay}
              <br />
              {formattedTime}
            </Typography>
          </Typography>
        </Box>
        <hr style={{ margin: '0 auto', maxWidth: '100%' }} />

        {/* Your main content goes here */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Card sx={{ maxWidth: 300, marginRight: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Total No. of Book
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.tb}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, marginRight: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Books in Circulation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.bic}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, marginRight: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Books Issued
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.bi}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Books Reissued
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.bri}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;
