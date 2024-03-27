const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample user data
let users = [
    { username: 'user1', password: 'pass1', name: 'User One', role: 'user' },
    { username: 'user2', password: 'pass2', name: 'User Two', role: 'user' }
];

const librarians = [
    { username: 'librarian1', password: 'pass1', name: 'Librarian One', role: 'librarian' },
    { username: 'librarian2', password: 'pass2', name: 'Librarian Two', role: 'librarian' }
];

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
};

// Route for user registration
app.post('/register/user', (req, res) => {
    const { username, password, name } = req.body;
    const newUser = { username, password, name, role: 'user' };
    users.push(newUser);
    res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Route for user login
app.post('/login/user', authenticateUser, (req, res) => {
    res.status(200).json({ success: true, message: `Welcome, ${req.user.name}!` });
});

// Middleware for librarian authentication
const authenticateLibrarian = (req, res, next) => {
    const { username, password } = req.body;
    const librarian = librarians.find(librarian => librarian.username === username && librarian.password === password);
    if (librarian) {
        req.librarian = librarian;
        next();
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
};

// Route for librarian login
app.post('/login/librarian', authenticateLibrarian, (req, res) => {
    res.status(200).json({ success: true, message: `Welcome, ${req.librarian.name}!` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
