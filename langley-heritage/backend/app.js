// Import and initialize modules
import express from 'express'
import { InitializeDB } from './functions.js';
const app = express();
InitializeDB();

// Express setup
app.use(express.static('./dist'))

// === Exports ===
export { app };