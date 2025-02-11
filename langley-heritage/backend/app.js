// Import and initialize express
import express from "express"
const app = express()

// Interpret request bodies as JSON
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


export { app };