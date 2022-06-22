require('dotenv').config();
const express = require('express');

const connectToDb  = require('./config/db');
const routes = require('./routes/index');

const app = express();

// Connection with database
connectToDb();

// Config to JSON response
app.use(express.json());

// App routes
app.use(routes);

// Run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running at: http://localhost:${PORT}`);
});