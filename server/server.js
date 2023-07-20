



const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aine@786',
  database: 'login',
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Handle login POST request
// Handle login POST request
// Handle login POST request
app.post('/login', (req, res) => {
  const { sid, password } = req.body;

  // Query the database for the username and password
  const query = `SELECT * FROM  login.student WHERE sid = ? AND password = ?`;
  connection.query(query, [sid, password], (error, results) => {
    if (error) {
      console.error('Failed to execute MySQL query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      jwt.sign(
        { results },
        "abc",
        { expiresIn: "4h" },
        (err, token) => {
          res.status(200).json({
             result: true,
            token: token,
            data: results,
          });
        }
      );

      // res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Wrong username or password' });
    }
  });
});




// Handle dashboard data POST request
app.post('/dashboard', (req, res) => {
  // Query the database for the required data
  const query = `
    SELECT
        COUNT(book_id) AS tb,
        SUM(quantity) AS bic,
        SUM(CASE WHEN quantity > 0 THEN 1 ELSE 0 END) AS bi,
        SUM(CASE WHEN quantity > 1 THEN 1 ELSE 0 END) AS bri
    FROM
        books;
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Failed to execute MySQL query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Process the fetched data as needed
    const data = {
      tb: results[0].tb,
      bic: results[0].bic,
      bi: results[0].bi,
      bri: results[0].bri
    };

    res.status(200).json(data);
  });
});


// Handle the POST request to /addbooks
app.post('/addbooks', (req, res) => {
  const {
    book_id,
    title,
    sub_title,
    date_Added,
    author1,
    author2,
    volume,
    date_modification,
    Publishers,
    new_publisher,
    year,
    editors,
    edition,
    place,
    subject,
    country,
    cat_no,
    usercode,
    order_number,
    amount,
    quantity,
    acqid,
    library,
    holdno
  } = req.body;

  // Insert the form data into the bookdata table
  const query = `
    INSERT INTO books (
      book_id,
      title,
      sub_title,
      date_Added,
      author1,
      author2,
      volume,
      date_modification,
      Publishers,
      new_publisher,
      year,
      editors,
      edition,
      place,
      subject,
      country,
      cat_no,
      usercode,
      order_number,
      amount,
      quantity,
      acqid,
      library,
      holdno
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query with the provided values
  const values = [
    book_id,
    title,
    sub_title,
    date_Added,
    author1,
    author2,
    volume,
    date_modification,
    Publishers,
    new_publisher,
    year,
    editors,
    edition,
    place,
    subject,
    country,
    cat_no,
    usercode,
    order_number,
    amount,
    quantity,
    acqid,
    library,
    holdno
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error:', error);
      // Send an error response
      res.sendStatus(500);
      return;
    }

    // Send a success response
    res.sendStatus(200);
  });
});









// Handle the POST request to /issuebooks
app.post('/issuebooks', (req, res) => {
  const { bookid, stuname, issdate ,duedate} = req.body;

  // Insert the form data into the issued table
  const query = 'INSERT INTO issued (book_id, sid, issued_date, due_date) VALUES (?, ?, ?,?)';
  connection.query(query, [bookid, stuname, issdate,duedate], (error, results) => {
    if (error) {
      console.error('Error:', error);
      // Send an error response
      res.sendStatus(500);
      return;
    }

    // Send a success response
    res.sendStatus(200);
  });
});








app.get('/reissuebooks/:sid', (req, res) => {
  const sid = req.params.sid;
  const query = 'SELECT * FROM issued WHERE sid = ?';
  console.log('SQL Query:', query);
  connection.query(query, [sid], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Error fetching book info from the database' });
    } else {
      console.log('Query Results:', results);
      res.json({ info: results });
    }
  });
});

app.post('/reissuebooks', (req, res) => {
  const { sid, action } = req.body;

  if (action === 'reissue') {
    const updateQuery = 'UPDATE issued SET due_date = DATE_ADD(due_date, INTERVAL 15 DAY) WHERE sid = ?';
    console.log('SQL Update Query:', updateQuery);
    connection.query(updateQuery, [sid], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Something went wrong' });
      } else {
        console.log('Number of rows affected:', results.affectedRows);
        res.status(200).json({ message: 'Success' });
      }
    });
  } else if (action === 'collect') {
    const deleteQuery = 'DELETE FROM issued WHERE sid = ?';
    console.log('SQL Delete Query:', deleteQuery);
    connection.query(deleteQuery, [sid], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error deleting row from the database' });
      } else {
        console.log('Row deleted successfully');
        res.sendStatus(200);
      }
    });
  } else if (action === 'lost') { // Added condition for action 'lost'
    const updateQuery = 'UPDATE issued SET lost = 1 WHERE sid = ?';
    console.log('SQL Update Query:', updateQuery);
    connection.query(updateQuery, [sid], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Something went wrong' });
      } else {
        console.log('Number of rows affected:', results.affectedRows);
        res.status(200).json({ message: 'Book marked as lost' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid action' });
  }
});







app.post('/report', (req, res) => {
  console.log('Request received');
  const { reportType } = req.body;
  let query = '';

  if (reportType === 'daily-issued') {
    query = 'SELECT `issued`.`book_id`, `issued`.`sid`, `issued`.`issued_date`, `issued`.`due_date` FROM `login`.`issued` WHERE `issued_date` = CURDATE()';
  }else if (reportType === 'daily-reissued') {
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
  
    query = `SELECT \`issued\`.\`book_id\`, \`issued\`.\`sid\`, \`issued\`.\`issued_date\`, \`issued\`.\`due_date\`
             FROM \`login\`.\`issued\`
             WHERE DATE(\`issued_date\`) = '${currentDate}' AND \`issued_date\` != \`due_date\` 
             ORDER BY \`issued_date\` DESC`;
  }
else if (reportType === 'daily-reissued') {
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format

  query = `SELECT \`issued\`.\`book_id\`, \`issued\`.\`sid\`, \`issued\`.\`issued_date\`, \`issued\`.\`due_date\`
           FROM \`login\`.\`issued\`
           WHERE DATE(\`issued_date\`) = '${currentDate}'
           AND \`book_id\` IN (
             SELECT \`book_id\`
             FROM \`login\`.\`issued\`
             GROUP BY \`book_id\`
             HAVING COUNT(DISTINCT \`issued_date\`) > 1
           )`;
}

  
  
   else if (reportType === 'monthly-issued') {
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)
    query = `SELECT \`issued\`.\`book_id\`, \`issued\`.\`sid\`, \`issued\`.\`issued_date\`, \`issued\`.\`due_date\` FROM \`login\`.\`issued\` WHERE MONTH(\`issued_date\`) = ${currentMonth}`;
  }else if (reportType === 'lost-book') {
    query = 'SELECT `issued`.`book_id`, `issued`.`sid`, `issued`.`issued_date`, `issued`.`due_date` FROM `login`.`issued` WHERE `lost` = 1';
  }else if (reportType === 'due-dated') {
      query = 'SELECT `issued`.`book_id`, `issued`.`sid`, `issued`.`issued_date`, `issued`.`due_date` FROM `login`.`issued` WHERE `due_date` = CURDATE()';
    
  
  
  
   // Add the query for due dated book report with condition
  }else if (reportType === 'circulated-book') {
    query = 'SELECT * FROM `login`.`issued`';
  }
  
   else if (reportType === 'year-issued') {
    const currentYear = new Date().getFullYear(); // Get the current year
    query = `SELECT \`issued\`.\`book_id\`, \`issued\`.\`sid\`, \`issued\`.\`issued_date\`, \`issued\`.\`due_date\` FROM \`login\`.\`issued\` WHERE YEAR(\`issued_date\`) = ${currentYear}`;
  }else if (reportType === 'monthly-reissued') {
    const daysDifference = 7; // Specify the number of days difference required
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-12)
    const currentYear = currentDate.getFullYear(); // Get the current year
    
    query = `SELECT \`issued\`.\`book_id\`, \`issued\`.\`sid\`, \`issued\`.\`issued_date\`, \`issued\`.\`due_date\`
             FROM \`login\`.\`issued\`
             WHERE DATEDIFF(\`due_date\`, \`issued_date\`) > ${daysDifference}
             AND MONTH(\`issued_date\`) = ${currentMonth}
             AND YEAR(\`issued_date\`) = ${currentYear}`;
  }
  
 

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query. ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
