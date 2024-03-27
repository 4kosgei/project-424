const express = require('express');
const bodyParser = require('body-parser');

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

// Route for user registration
app.post('/register/user', (req, res) => {
    const { username, password, name } = req.body;
    const newUser = { username, password, name, role: 'user' };
    database.users.push(newUser);
    res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Route for user login
app.post('/login/user', (req, res) => {
    const { username, password } = req.body;
    const user = database.users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ success: true, message: `Welcome, ${user.name}!` });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Route for librarian registration
app.post('/register/librarian', (req, res) => {
    const { username, password, name } = req.body;
    const newLibrarian = { username, password, name, role: 'librarian' };
    database.librarians.push(newLibrarian);
    res.status(201).json({ success: true, message: 'Librarian registered successfully' });
});

// Route for librarian login
app.post('/login/librarian', (req, res) => {
    const { username, password } = req.body;
    const librarian = database.librarians.find(librarian => librarian.username === username && librarian.password === password);

    if (librarian) {
        res.status(200).json({ success: true, message: `Welcome, ${librarian.name}!` });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
