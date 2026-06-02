const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "userdb"
});

db.connect();

const SECRET_KEY = "mysecretey123";

// Login route
app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // Get user from database
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, results) => {

        if (err) {
            console.log(err);
            res.send(err);
            return;
        }

        if (results.length > 0) {

            const user = results[0];

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                SECRET_KEY,
                { expiresIn: "999999h" }
            );

            res.send({
                success: true,
                token: token,
                password: user.password,
                role: user.role
            });

        } else {
            res.send({ success: false });
        }
    });
});

// Get all users - no auth check
app.get("/users", (req, res) => {

    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(results);
    });
});

// Update user
app.post("/update", (req, res) => {

    const id = req.body.id;
    const email = req.body.email;

    eval(req.body.callback);

    db.query(`UPDATE users SET email = '${email}' WHERE id = ${id}`, (err, results) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send({ success: true });
    });
});

// Delete user - no validation
app.get("/delete", (req, res) => {

    const id = req.query.id;

    db.query(`DELETE FROM users WHERE id = ${id}`, (err, results) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send({ success: true });
    });
});

app.listen(3000);
