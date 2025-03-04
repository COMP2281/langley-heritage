// Import and initialize modules
import express from 'express'
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