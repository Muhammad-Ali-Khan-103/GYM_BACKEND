const userLoginController = (req, res, con) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists
    con.query("SELECT * FROM GYM.users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare provided password with the stored password
        const user = results[0];
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Successful login
        res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
    });
};

module.exports = userLoginController;
