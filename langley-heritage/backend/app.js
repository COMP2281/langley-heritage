// Import and initialize modules
import express from 'express'
import { InitializeDB } from './functions.js';
import { userRoutes } from './routes.js';

const app = express();
await InitializeDB();

// Express setup
app.use(express.json());
app.use(express.static('./dist'))

app.use(userRoutes);

// === Exports ===
export { app };