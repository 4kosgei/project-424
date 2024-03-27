const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory "database"
let database = {
    users: [
        { username: 'user1', password: 'pass1', name: 'User One', role: 'user' },
        { username: 'user2', password: 'pass2', name: 'User Two', role: 'user' }
    ],
    librarians: [
        { username: 'librarian1', password: 'pass1', name: 'Librarian One', role: 'librarian' },
        { username: 'librarian2', password: 'pass2', name: 'Librarian Two', role: 'librarian' }
    ]
};

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for user registration
app.post('/register/user', (req, res) => {
    const { username, password, name } = req.body;
    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            const newUser = { username, password: hashedPassword, name, role: 'user' };
            database.users.push(newUser);
            res.status(201).json({ success: true, message: 'User registered successfully' });
        }
    });
});

// Route for user login
app.post('/login/user', (req, res) => {
    // Your user login logic here
});

// Route for librarian registration
app.post('/register/librarian', (req, res) => {
    const { username, password, name } = req.body;
    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            const newLibrarian = { username, password: hashedPassword, name, role: 'librarian' };
            database.librarians.push(newLibrarian);
            res.status(201).json({ success: true, message: 'Librarian registered successfully' });
        }
    });
});

// Route for librarian login
app.post('/login/librarian', (req, res) => {
    // Your librarian login logic here
});

// Route to serve the HTML file
app.get('/my-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '@424.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
