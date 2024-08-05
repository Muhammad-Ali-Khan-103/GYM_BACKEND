const express = require("express");
const bodyParser = require("body-parser");
const connectToSqlDb = require('./config/db');
const userSignUpController = require('./controllers/userSignUpController');
const userLoginController = require("./controllers/userLoginController");

const cors = require('cors')



const app = express();

app.use(cors())

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize the database connection and setup
connectToSqlDb((err, con) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the application if there's an error
    }

    // Define RESTful API endpoints

    // Endpoint to get a welcome message
    app.get('/api', (req, res) => {
        res.json({ message: "Welcome to the REST API" });
    });

    // Example endpoint to handle database operations
    app.get('/api/db', (req, res) => {
        con.query("SHOW TABLES FROM GYM", (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ tables: results });
        });
    });

    // User sign-up endpoint
    app.post('/api/sign-up', (req, res) => userSignUpController(req, res, con));
    app.post('/api/login', (req, res) => userLoginController(req, res, con));
    

    // Handle 404 - Page not found
    app.use((req, res) => {
        res.status(404).json({ message: "Not Found" });
    });

    // Start the Express server
    const PORT = 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
