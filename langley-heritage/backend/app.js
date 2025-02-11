// Import and initialize express
import express from 'express'
const app = express()

// Interpret request bodies as JSON
app.use(express.json())

// Import and initialize sqlite3
import sqlite3 from 'sqlite3'
const db = InitializeDB()

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

function InitializeDB()
{
    const db = new sqlite3.Database('db.sqlite')

    // Create database if not created already

    return db
}

export { app };