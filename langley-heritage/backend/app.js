import fs from 'fs'

// Import and initialize express
import express from 'express'
const app = express()
app.use(express.json())

// Import and initialize sqlite3
import sqlite3 from 'sqlite3'
const db = InitializeDB()

// ===== GET Methods =====
app.get('/', (req, res) => {
    db.run('SELECT * FROM Records', QueryCallback)
    res.send('Hello, Express!');
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

export { app };