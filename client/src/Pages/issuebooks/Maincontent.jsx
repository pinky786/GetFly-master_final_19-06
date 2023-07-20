import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

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

  const [formFields, setFormFields] = useState({
    bookid: '',
    stuname: '',
    issdate: '',
    duedate: '',
  });

  useEffect(() => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    setFormFields((prevState) => ({
      ...prevState,
      issdate: currentDate.toISOString().split('T')[0],
      duedate: formattedDueDate,
    }));
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleUpdateButtonClick = async () => {
    // Do something with the form fields
    const res = await fetch('http://localhost:3000/issuebooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    });

    if (res.status === 200) {
      alert('Success');
      navigate('/dashboard');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.greeting}>
        <h2>Hello, {localStorage.userName}!</h2>
        <p>{formatDate()}</p>
      </div>
      <hr style={styles.horizontalLine} />
      <div className="form-container">
        <div className="issueBooks">
          <h2>Master Tab {'>'} Issue Book</h2>
          <div className="form-field">
            <label htmlFor="bookid">Book Id</label>
            <input type="text" id="bookid" value={formFields.bookid} onChange={handleInputChange} />
          </div>
          <div className="form-field">
            <label htmlFor="stuname">Student ID</label>
            <input type="text" id="stuname" value={formFields.stuname} onChange={handleInputChange} />
          </div>
          <div className="form-field">
            <label htmlFor="issdate">Issue Date</label>
            <input type="date" id="issdate" value={formFields.issdate} disabled />
          </div>
          <div className="form-field">
            <label htmlFor="duedate">Due Date</label>
            <input type="date" id="duedate" value={formFields.duedate} disabled />
          </div>
        </div>
        <button
          className="small-button"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            fontSize: '18px',
            padding: '12px 24px',
            borderRadius: '8px',
          }}
          onClick={handleUpdateButtonClick}
        >
          Issue Book
        </button>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  greeting: {
    marginTop: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  horizontalLine: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '20px 0',
  },
};

export default MainContent;
