import multer from 'multer';
import fs from 'fs';
import { parseCSVAndInsert, md5Hash } from './functions.js';
import { db } from './functions.js'
import express from 'express'

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Upload CSV file to the web-server
router.post('/upload', upload.single("file"), (req, res) => {
  if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

  // Read file contents to a string
  const fileContent = req.file.buffer.toString("utf8");

  // Insert the value into the database
    parseCSVAndInsert(fileContent);
});

router.get('/search', (req, res) => {
	const query = req.query.query

	console.log(query)

	db.all(`SELECT * FROM Records WHERE CONCAT_WS(' ', Firstname, Middlename, Surname) = ?`, query, (err, rows) =>
	{
		res.send(rows)
	})
})

// Retrieve a single record
router.get('/record', (req, res) => {
	const recordID = req.query.id;
	db.get("SELECT * FROM Records WHERE RecordID = ?", recordID, (err, row) => {
		if (err)
			res.sendStatus(404)
		res.send(JSON.stringify(row))
    });
})

// ===== Admin Log In =====
router.post('/adminlogin', (req, res) => {
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

export { router as userRoutes};