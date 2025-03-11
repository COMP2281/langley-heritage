import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { parseCSVAndInsert, md5Hash } from './functions.js';
import { app } from "./app.js"

console.log("This file is running")

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload CSV file to the web-server
app.post('/upload', upload.single("file"), (req, res) => {
  if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

  // Read file contents to a string
  const fileContent = req.file.buffer.toString("utf8");

  // Insert the value into the database
    parseCSVAndInsert(fileContent);
});

app.get('/record', (req, res) => {
    const recordID = req.query.id;
    // Implement logic to fetch and return record details
    res.send("hello");
});

// ===== Admin Log In =====
app.post('/adminlogin', (req, res) => {
  // username and password
  const data = req.body;
  const hashed_username = md5Hash(data.username);
  const hashed_password = md5Hash(data.password);
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  if (hashed_username === config.username && hashed_password === config.password) {
    // Redirect to the page and do something here
    res.status(200);
  } else {
    // Add a page showing Error HTML
    res.status(401).send("Unauthorized: Invalid Username Or Password");
  }
});