import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookInfo, setBookInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    fetch('http://localhost:3000/reissuebooks')
      .then((res) => res.json())
      .then((data) => {
        if (data.info && Array.isArray(data.info)) {
          setBookInfo(data.info);
        }
      })
      .catch((error) => console.error('Error fetching book info:', error));
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

  const handleUpdateButtonClick = async (sid, action) => {
    const selectedBook = bookInfo.find((issued) => issued.sid === sid);
    const payload = {
      sid,
      action,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/reissuebooks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.status === 200) {
        if (action === 'reissue') {
          alert('Success');
          // Update the due date in bookInfo state
          const updatedBookInfo = bookInfo.map((book) => {
            if (book.sid === sid) {
              return {
                ...book,
                due_date: new Date(selectedBook.due_date).getTime() + 15 * 24 * 60 * 60 * 1000,
              };
            }
            return book;
          });
          setBookInfo(updatedBookInfo);
        } else if (action === 'collect') {
          alert('Book collected');
          // Remove the book from bookInfo state
          const updatedBookInfo = bookInfo.filter((book) => book.sid !== sid);
          setBookInfo(updatedBookInfo);
        }
      } 
      else if (action === 'lost') {
        alert('Book marked as lost');
        // Update the book's lost status in bookInfo state
        const updatedBookInfo = bookInfo.map((book) => {
          if (book.sid === sid) {
            return {
              ...book,
              lost: 1,
            };
          }
          return book;
        });
        setBookInfo(updatedBookInfo);
      }
    else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    fetch(`http://localhost:3000/reissuebooks/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.info && Array.isArray(data.info)) {
          setBookInfo(data.info);
        }
      })
      .catch((error) => console.error('Error fetching book info:', error));
  };

  const filteredBooks = bookInfo.filter((issued) =>
    issued.sid?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.mainContent}>
      <div style={styles.greeting}>
        <h2>Hello, {localStorage.userName}!</h2>
        <p>{formatDate()}</p>
      </div>
      <hr style={styles.horizontalLine} />

      {/* Search input */}
      <TextField
        type="text"
        label="Search by Student ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />


<Box sx={{ mt: '2rem' }}>
  <div className="app-container">
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Book ID</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Student Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Issued Date</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Due Date</th>
        
          <th style={{ border: '1px solid black', padding: '8px' }}>Approval</th>
        </tr>
      </thead>

      <tbody>
        {filteredBooks.map((issued) => (
          <tr key={issued.book_id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{issued.book_id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{issued.sid}</td>
            

            <td style={{ border: '1px solid black', padding: '8px' }}>
              {new Date(issued.issued_date).toLocaleString()}
            </td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              {new Date(issued.due_date).toLocaleString()}
            </td>
           
            <td style={{ border: '1px solid black', padding: '8px' }}>
            <button
  onClick={() => handleUpdateButtonClick(issued.sid, 'reissue')}
  style={{ backgroundColor: 'blue', color: 'white'}}
>
  Reissue
</button>

              <button
  onClick={() => handleUpdateButtonClick(issued.sid, 'collect')}
  style={{ backgroundColor: 'red', color: 'white' }}
>
  Collect
</button>


<button
  onClick={() => handleUpdateButtonClick(issued.sid, 'lost')}
  style={{ backgroundColor: 'green', color: 'white' }}
>
  lost
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Box>


      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/report')}>
          Update
        </Button>
      </Box>
    </div>
  );
};

export default MainContent;

const styles = {
  mainContent: {
    margin: '25px',
    flex: 1,
    padding: '20px',
  },
  greeting: {
marginTop:'10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  horizontalLine: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '20px 0',
  },
};
