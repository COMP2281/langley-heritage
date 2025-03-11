import fs from 'fs';
import csv from 'csv-parser';
import sqlite3 from 'sqlite3';
import { Readable } from 'stream';
import { Record } from './Record.js';

let db;
let nextRecordID = 0;

// ===== Database Setup =====
function QueryCallback(runResult)
{
	if (runResult)
		console.log(runResult.message)
}

async function InitializeDB()
{
	const dbInitialized = fs.existsSync('db.sqlite')
	db = new sqlite3.Database('db.sqlite')

	// Create database if not created already
	if (!dbInitialized)
	{
		// Create the database table
		console.log("Initializing database!")
		await db.run(`CREATE TABLE Records (RecordID INTEGER PRIMARY KEY,
			Surname TEXT,
			Firstname TEXT,
			Middlename TEXT,
			DOB TEXT,
			DOD TEXT,
			BurialDate TEXT,
			PlotNumber TEXT,
			BurialType TEXT,
			Address TEXT,
			GraveLat REAL,
			GraveLong REAL,
			Description TEXT);`, QueryCallback)
		console.log("Database initialized")
		
		// Really janky fix for asynchronous table creation
		await new Promise(r => setTimeout(r, 200));

		// Add default records from CSV
		console.log("Adding default records")
		let defaultRecordsStr = fs.readFileSync('./backend/data/burialrecords.csv').toString()
		parseCSVAndInsert(defaultRecordsStr)
	}
}

function objectToSQLParams(obj)
{
	let ret = {}
	for (let [key, value] of Object.entries(obj))
		ret[`$${key}`] = value
	return ret
}

function addRecord(record)
{
	db.run(`INSERT INTO Records VALUES (${nextRecordID++}, $surname, $firstname, $middlename, $dob, $dod,
		$burialDate, $plotNumber, $burialType, $address, $graveLat, $graveLong, $description)`, objectToSQLParams(record), QueryCallback)
}

function parseCSVAndInsert(fileStr) {
	// Convert file string to a stream
	let fileStream = Readable.from(fileStr)

	const rows = [];
	fileStream
	.pipe(csv())
	.on('data', (row) => rows.push(row))
	.on('end', () => {
		for (let row of rows)
			addRecord(Record.FromCSVRow(row))
	})
	.on('error', (error) => {
	  console.error('Error reading CSV file:', error.message);
	});
}

function md5Hash(data) {
	return crypto.createHash('md5').update(data).digest('hex');
};

export { InitializeDB, addRecord, parseCSVAndInsert, md5Hash };