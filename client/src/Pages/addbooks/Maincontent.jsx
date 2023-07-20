
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
  const [formFields, setFormFields] = useState({
    book_id: '',
    title:'',
    sub_title: '',
    date_Added: '',
    author1: '',
    author2: '',
    valume:'',
    date_modification:'',
    Publishers: '',
    new_publisher:'',
    year: '',
    editors:'',
    edition:'',
    place: '',
    subject: '',
    country: '',
    cat_no:'',
    usercode: '',
    order_number:'',
    amount:'',
    quantitty:'',
    acqid:'',
    library:'',
    holdno:''
  });
  useEffect(() => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    setFormFields((prevState) => ({
      ...prevState,
      date_Added: currentDate.toISOString().split('T')[0],
      date_modification: currentDate.toISOString().split('T')[0],
      duedate: formattedDueDate,
    }));
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleUpdateButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/addbooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formFields)
      });

      if (response.ok) {
        alert('Success');
        navigate('/dashboard');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    const currentDate = new Date();
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  const options1 = {weekday: 'long'}
  const formatteDay = currentDate.toLocaleDateString(undefined,options1)
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const formattedTime = currentDate.toLocaleTimeString();

  const userName = "User"; // Change this to the actual user name or greeting


  return (

     

        <Box sx={{ display: "flex" ,marginTop:60}}>
    <CssBaseline />
   

    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Box sx={{ textAlign: "left", mb: 2, ml: 5,mt:40 }}>
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

        <Box sx={{ textAlign: 'left', py: 1 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Add Books
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'left', fontSize: '1.2rem' }}>
      <Typography variant="h6" component="div" color="grey">
          Catalogues info
        </Typography>
      </Box>
      <Box
  sx={{
    marginTop: '1rem',
    backgroundColor: '#f2f2f2',
    padding: '1rem',
    borderRadius: '4px',
  }}
>




<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} onSubmit={handleUpdateButtonClick}>
  
    <div className="form-field">
    <Typography name="book_id" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Book ID
    </Typography>
      <input type="text" id="book_id" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.book_id} onChange={handleInputChange} />
    </div>

    {/* <Typography name="catNo" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Cat No.
    </Typography>
    <input name="catNo" onChange={handleInputChange} variant="outlined" size="small" sx={{marginRight: '1rem' ,  backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="title" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Title
    </Typography>
    <input type="text" id="title" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.title} onChange={handleInputChange}/>
    </div>

    {/* <Typography name='title' variant="body2" size="small"sx={{ marginRight: '0.5rem' }}>
    Title
    </Typography>
    <TextField name='title' variant="outlined" size="small" sx={{marginRight: '1rem' , backgroundColor:'white',borderRadius:"5%"}} /> */}

<div className="form-field">
    <Typography name="sub_title" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Sub Title
    </Typography>
    <input type="text" id="sub_title" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.sub_title} onChange={handleInputChange}/>
    </div>
    <div className="form-field">
    <Typography name="date_added" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Added date
    </Typography>
            <input type="date" id="date_added" value={formFields.date_Added} disabled style={{ width: '160px' ,backgroundColor:'white'}}/>
          </div>

    {/* <Typography variant="body3" size="small"sx={{ marginRight: '0.5rem' }}>
    Subtitle
    </Typography>
    <TextField variant="outlined" size="small" sx={{  backgroundColor:'white',borderRadius:"5%"}} /> */}
  </Box>


  
<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem'  }}>
    

    {/* <Typography variant="body7" size="small" sx={{ marginRight: '0.5rem' }}>
    Year
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight:'1rem',  backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="author1" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Author-1
    </Typography>
    <input type="text" id="author1"style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.author1} onChange={handleInputChange}/>
    </div>

    {/* <Typography variant="body8" size="small"sx={{ marginRight: '0.2rem' }}>
    Author-1
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight:'1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="author2" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Author-2
    </Typography>
    <input type="text" id="author2" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.author2} onChange={handleInputChange}/>
    </div>
    <div className="form-field">

<Typography name="valume" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
Volume
</Typography>
<input type="text" id="valume" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.valume} onChange={handleInputChange} />
</div>
    <div className="form-field" >
    <Typography name="date_modification" variant="body1" size="small" sx={{ marginRight: '0.5rem'}}>
    modification date
    </Typography>
            <input type="date" id="date_modification" value={formFields.date_modification} disabled style={{ width: '160px',backgroundColor:'white' }} />
          </div>


    {/* <Typography variant="body9" size="small"sx={{ marginRight: '0.2rem' }}>
    Author-2
    </Typography>
    <TextField variant="outlined" size="small" sx={{  marginRight:'1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}
  </Box>


<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
<div className="form-field">
    <Typography name="publisher" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Publishers
    </Typography>
    <input type="text" id="publisher" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.publisher} onChange={handleInputChange}/>
    </div>
          <Button
    variant="outlined"
    size="small"
    sx={{
      marginRight: '1rem',
      backgroundColor: 'lightgrey',
      borderRadius: '5%',
      width: 'auto' // Set the width to auto
    }}
  >
    Edit
  </Button>
<TextField
id='new_publisher'
  variant="outlined"
  label="New Publisher"
  size="small"
  sx={{
    marginRight: '1rem',
    backgroundColor: 'lightgrey',
    borderRadius: '5%',
    width: 'auto' // Set the width to auto
  }}
/>


  </Box>

  


<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <div className="form-field">

    <Typography name="year" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Year
    </Typography>
    <input type="text" id="year" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.year} onChange={handleInputChange}/>
    </div>

    {/* <Typography variant="body7" size="small" sx={{ marginRight: '0.5rem' }}>
    Year
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight:'1rem',  backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="editors" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    editors
    </Typography>
    <input type="text" id="editors" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.editors} onChange={handleInputChange}/>
    </div>

    {/* <Typography variant="body8" size="small"sx={{ marginRight: '0.2rem' }}>
    Author-1
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight:'1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="edition" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    edition
    </Typography>
    <input type="text" id="edition" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.edition} onChange={handleInputChange}/>
    </div>
 
    {/* <Typography variant="body9" size="small"sx={{ marginRight: '0.2rem' }}>
    Author-2
    </Typography>
    <TextField variant="outlined" size="small" sx={{  marginRight:'1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}
  </Box>


  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

    <div className="form-field">
    <Typography name="place" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Place
    </Typography>
    <input type="text" id="place" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.place} onChange={handleInputChange}/>
    </div>

    {/* <Typography variant="body10" size="small" sx={{ marginRight: '0.5rem' }}>
    Place
    </Typography>
    <TextField variant="outlined" size="small" sx={{   marginRight:'1rem',backgroundColor:'white',borderRadius:"5%"}} /> */}


<div className="form-field">
    <Typography name="subject" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    subject
    </Typography>
    <input type="text" id="subject"style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.subject} onChange={handleInputChange}/>
    </div>


    <div className="form-field">
    <Typography name="country" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Country
    </Typography>
    <input type="text" id="country"style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.country} onChange={handleInputChange}/>
    </div>
    <div className="form-field">
    <Typography name="catNo" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Cat No.
    </Typography>
      <input type="text" id="catNo"style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.catNo} onChange={handleInputChange} />
    </div>

    {/* <Typography variant="body12" size="small" sx={{ marginRight: '0.5rem' }}>
    Country
    </Typography>
    <TextField variant="outlined" size="small" sx={{   marginRight:'1rem',backgroundColor:'white',borderRadius:"5%"}} /> */}

  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

  <div className="form-field">
    <Typography name="userCode" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    User Code
    </Typography>
    <input type="text" id="userCode" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.userCode} onChange={handleInputChange}/>
    </div>

    {/* <Typography variant="body13" size="small"sx={{ marginRight: '1rem' }} >
   User Code
    </Typography>
    <TextField variant="outlined" size="small" sx={{  marginRight:'1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}

<div className="form-field">
    <Typography name="order_number" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    order_number
    </Typography>
    <input type="text" id="order_number" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.order_number} onChange={handleInputChange}/>
    </div>
    
  <div className="form-field">
    <Typography name="amount" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    amount
    </Typography>
    <input type="text" id="amount" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.amount} onChange={handleInputChange}/>
    </div>
    <div className="form-field">
    <Typography name="quantity" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    quantity
    </Typography>
    <input type="text" id="quantity" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.quantity} onChange={handleInputChange}/>
    </div>


    {/* <Typography variant="body14" size="small" sx={{ marginRight: '1rem' }}>
    Data Added
    </Typography>
    <TextField variant="outlined" size="small" sx={{  marginRight:'1rem',backgroundColor:'white',borderRadius:"5%"}} /> */}
   
   
  </Box>


</Box>

<Box sx={{ textAlign: 'left', fontSize: '1.2rem' , marginTop: '1rem'}}>
<Typography variant="h6" component="div" color="grey">
    Aquisition info
  </Typography>
</Box>

<Box
  sx={{
    marginTop: '1rem',
    backgroundColor: '#f2f2f2',
    padding: '1rem',
    borderRadius: '4px',
  }}
>
<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

    <div className="form-field">
    <Typography name="catNo" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Cat No.
    </Typography>
      <input type="text" id="catNo" style={{ width: '160px',marginRight: '3.5rem' }} value={formFields.catNo} onChange={handleInputChange} />
    </div>

    {/* <Typography variant="body1" sx={{ marginRight: '0.5rem' }}>
      Cat No.
    </Typography>
    <TextField variant="outlined" size="small" sx={{  marginRight: '0.5rem' ,backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="acqid" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Acq ID
    </Typography>
      <input type="text" id="acqid" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.acqid} onChange={handleInputChange} />
    </div>

    {/* <Typography variant="body1"sx={{ marginRight: '0.5rem' }}>
    Acq ID
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight: '0.5rem' , backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="library" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Library
    </Typography>
      <input type="text" id="library" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.library} onChange={handleInputChange} />
    </div>

    {/* <Typography variant="body1" sx={{ marginRight: '0.5rem' }}>
      Library
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight: '0.5rem' , backgroundColor:'white',borderRadius:"5%"}} /> */}

  </Box>
</Box>

<Box sx={{ textAlign: 'left', fontSize: '1.2rem', marginTop: '1rem' }}>
<Typography variant="h6" component="div" color="grey">
    Holding info
  </Typography>
</Box>

<Box
  sx={{
    backgroundColor: '#f2f2f2',
    
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem', // Add margin to create space between the boxes
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

    <div className="form-field">
    <Typography name="holdno" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Hold No.
    </Typography>
      <input type="text" id="holdno" style={{ width: '160px',marginRight: '3.5rem' }}value={formFields.holdno} onChange={handleInputChange} />
    </div>

    {/* <Typography variant="body1" sx={{ marginRight: '1rem' }}>
      Hold No.
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight: '1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}

    <div className="form-field">
    <Typography name="acqid" variant="body1" size="small" sx={{ marginRight: '0.5rem' }}>
    Acq ID
    </Typography>
      <input type="text" id="acqid" style={{ width: '160px' }}value={formFields.acqid} onChange={handleInputChange} />
    </div>
    
    {/* <Typography variant="body1" sx={{ marginRight: '1rem' }}>
    Acq ID
    </Typography>
    <TextField variant="outlined" size="small" sx={{ marginRight: '1rem', backgroundColor:'white',borderRadius:"5%"}} /> */}

  </Box>

</Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Button variant="contained" color="primary" onClick={handleUpdateButtonClick}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;