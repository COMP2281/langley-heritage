// Import and initialize modules
import express, { response } from 'express'
import fs from 'fs'
import csv from 'csv-parser'
import fileUpload from 'express-fileupload';
import sqlite3 from 'sqlite3'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const db = InitializeDB()


// Express setup
app.use(express.json());
app.use(express.static('./dist'))
app.use(fileUpload());

// === Global Variables ===
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===== Endpoints =====
// Upload CSV file to the web-server
app.post('upload', (req, res) => {
    let sampleFile;
    let uploadPath;
  
    uploadPath = path.join(__dirname, '..', 'data', sampleFile.name);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + './data' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
      res.send('File uploaded!');
    });
    // Insert the value into the database
    parseCSVAndInsert(uploadPath);
});

// ===== Database Setup =====
function QueryCallback(runResult)
{
    if (runResult)
        console.log(runResult.message)
}

function InitializeDB()
{
    const dbInitialized = fs.existsSync('db.sqlite')
    const db = new sqlite3.Database('db.sqlite')

    // Create database if not created already
    if (!dbInitialized)
    {
        console.log("Initializing database!")
        db.run('CREATE TABLE Records (RecordID INTEGER PRIMARY KEY, Name TEXT, Born TEXT, Died TEXT, GraveLat REAL, GraveLong REAL, Description TEXT);', QueryCallback)

        db.run('CREATE TABLE Tags (TagID INTEGER PRIMARY KEY, RecordID INTEGER, Tag TEXT, FOREIGN KEY(RecordID) REFERENCES Records(RecordID));', QueryCallback)
    }

    return db
}

// A function to update the file to the database
function parseCSVAndInsert(filePath) {
    const rows = [];
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => rows.push(row)) // Push each row into an array
    .on('end', () => {
      // Insert each row into the database
      rows.forEach((row) => {
        db.run(
          'INSERT INTO data (column1, column2, column3) VALUES (?, ?, ?)',
          [row.column1, row.column2, row.column3],
          (err) => {
            if (err) {
              console.error('Error inserting row:', err.message);
            }
          }
        );
      });
      console.log('CSV data inserted successfully.');
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error.message);
    });
}

export { app };

// ===== LOG IN =====
app.post('/login', (req, res) => {
  // username and password
  const data = req.body;
  const hashed_username = md5Hash(data.username);
  const hashed_password = md5Hash(data.password);
  const config = require('./config.json');
  if (hashed_username === config.username && hashed_password === config.password) {
    // Redirect to the page and do something here
    res.status(200);    
  } else {
    // Add a page showing Error HTML
    res.status(401).send("Unauthorized: Invalid Username Or Password");
  }
});

// ===== SIGN UP =====
app.post('/signup', (req, res) => {
  let config = require('./config.json');
  if (config.check === true) {
    res.status(401).send("Already signed up");
  }
  config.username = username;
  config.password = password;
  config.check = true;
  res.status(200).send("Signed up successfully");
});

// ===== MD5 ======
function md5Hash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}