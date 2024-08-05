const userSignUpController = (req, res, con) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if email already exists
    con.query("SELECT * FROM GYM.users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Insert the new user into the database
        const query = "INSERT INTO GYM.users (name, email, password) VALUES (?, ?, ?)";
        con.query(query, [name, email, password], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User created successfully" });
        });
    });
};

module.exports = userSignUpController;
