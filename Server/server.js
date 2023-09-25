const express = require("express");
const cors = require("cors");
const pool = require("./database");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Login
let adminusername = "";
let adminpass = "";

async function admincheck() {
  const res = await pool.query(`SELECT * FROM accounts where "username"=$1 and password=$2;`, [adminusername, adminpass]);
  const admindata = res.rows[0];
  return admindata;
}

app.post("/admincheck", async (req, res) => {
  adminusername = req.body.username;
  adminpass = req.body.password;

  try {
    const admindata = await admincheck();
    if (admindata === undefined) {
      res.send(false);
      console.log("Authentication Failed!");
    } else {
      res.send(true);
      console.log("Authentication Successful!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred during authentication");
  }
});

async function employeecheck() {
  const res = await pool.query(`SELECT * FROM employeetable where "username"=$1 and password=$2;`, [adminusername, adminpass]);
  const employeedata = res.rows[0];
  return employeedata;
}

app.post("/employeecheck", async (req, res) => {
  adminusername = req.body.username;
  adminpass = req.body.password;

  try {
    const employeedata = await employeecheck();
    if (employeedata === undefined) {
      res.send(false);
      console.log("Authentication Failed!");
    } else {
      res.send(true);
      console.log("Authentication Successful!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred during authentication");
  }
});

// Register
app.post("/adduser", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const insertSTMT = `INSERT INTO accounts (username, password) VALUES ($1, $2);`;
    await pool.query(insertSTMT, [username, password]);
    console.log("User registered successfully");
    res.send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

// Admin Dashboard - Add Sport Equipment
app.post("/addsport", async (req, res) => {
  const venue = req.body.venue;
  const sports = req.body.sports;
  const date = req.body.event_date;
  const time = req.body.event_time;
  const equipment = req.body.equipment;
  const quantity = req.body.quantity;
  const end_Time = req.body.end_time;

  try {
    const insertQuery = `
      INSERT INTO details (venue, sports, date, time, equipment, quantity, end_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    await pool.query(insertQuery, [venue, sports,date, time, equipment, quantity, end_Time]);
    console.log('Data Saved');
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the data' });
  }
});

// Employee Dashboard - Submit Data
data = {}
pool.connect()

app.post('/submitData', async (req, res) => {
  const { username, venue, sport, equipment, startTime, endTime, EquipmentQuantity } = req.body;


    const insertQuery = `
      INSERT INTO public."employee_book_venue" (username, venue, sport, equipment, "startTime", "endTime", "EquipmentQuantity")
      VALUES ($1, $2, $3, $4, $5, $6, $7); `;

     pool
    .query(insertQuery, [username, venue, sport, equipment, startTime, endTime, EquipmentQuantity])
    .then(() => {
    console.log('Data Saved');
    res.status(200).json({ message: 'Data saved successfully' });
  })
  .catch ((err) => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the data' });
  });
});

// Fetch All Data
app.get('/alldata', async (req, res) => {
  // Execute a SQL query to fetch all data
  pool.query('SELECT DISTINCT venue, sports, equipment FROM details;', (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    } else {
      // Extract the data from the database results
      const data = results.rows;

      // Send the data as a JSON response
      res.json(data);
    }
  });
});

app.listen(4000, () => console.log("Server on localhost:4000"));
