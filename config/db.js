const mysql = require('mysql2');

const connectToSqlDb = (callback) => {
    // Create connection to MySQL server
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    // Connect to MySQL server and initialize the database if necessary
    con.connect(err => {
        if (err) return callback(err);
        console.log('Connected to MySQL server');

        // Check if database exists
        con.query("SHOW DATABASES LIKE 'GYM'", (err, result) => {
            if (err) return callback(err);

            if (result.length === 0) {
                // Database does not exist, so create it
                con.query("CREATE DATABASE GYM", err => {
                    if (err) return callback(err);
                    console.log("Database GYM is created");
                    callback(null, con);
                });
            } else {
                console.log("Database GYM already exists");
                callback(null, con);
            }
        });
    });
};

module.exports = connectToSqlDb;
