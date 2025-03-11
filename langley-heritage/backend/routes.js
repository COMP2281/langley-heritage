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

	db.all(`
		SELECT RecordID, Surname, Firstname, Middlename, DOB, DOD 
		FROM (
			SELECT *, 
				CASE 
					WHEN CONCAT_WS(' ', LOWER(Firstname), LOWER(Middlename), LOWER(Surname)) = $query THEN 1
					WHEN CONCAT(LOWER(Firstname), ' ', LOWER(Surname)) = $query THEN 2
					WHEN LOWER(Surname) = $query THEN 3
					WHEN LOWER(Firstname) = $query THEN 4
				END AS match_priority
			FROM Records
		) AS FilteredRecords
		WHERE match_priority IS NOT NULL
		ORDER BY match_priority;
		`, {$query: query.toLowerCase()}, (err, rows) =>
	{
		console.log(`John count: ${rows.length}`)
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
  const username = data.username;
  const hashed_password = md5Hash(data.password);
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  if (username === config.username && hashed_password === config.password) {
    // Redirect to the page and do something here
    res.status(200);
  } else {
    // Add a page showing Error HTML
    res.status(401).send("Unauthorized: Invalid Username Or Password");
  }
});

// ===== Admin Log In =====
router.get('/signup', (req, res) => {
	// Assume that the form contains email, checked email, password
	const rawData = fs.readFileSync('./config.json');
 	const config = JSON.parse(rawData);
	if (config.exist) {
        return res.status(401).send("Account has already been created");
    }
	const { email, confirmed_email, password } = req.body;
	if (email !== confirmed_email) {
        return res.status(401).send("Incorrect email");
    }
	config.username = email;
	config.password = md5Hash(password);
	config.exist = true;
	fs.writeFile('./config.json', JSON.stringify(config, null, 3), (err) => {
        if (err) {
            return res.status(500).send("Error saving data");
        }
        console.log('JSON updated successfully!');
        res.redirect('/adminlogin'); // Redirect after writing is completed
    });
});

export { router as userRoutes};