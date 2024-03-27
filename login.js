const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample user data
const users = [
    { username: 'user1', password: 'pass1', name: 'User One', role: 'user' },
    { username: 'user2', password: 'pass2', name: 'User Two', role: 'user' }
];

const librarians = [
    { username: 'librarian1', password: 'pass1', name: 'Librarian One', role: 'librarian' },
    { username: 'librarian2', password: 'pass2', name: 'Librarian Two', role: 'librarian' }
];

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Route for user login
app.post('/login/user', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ success: true, message: `Welcome, ${user.name}!` });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Route for librarian login
app.post('/login/librarian', (req, res) => {
    const { username, password } = req.body;
    const librarian = librarians.find(librarian => librarian.username === username && librarian.password === password);

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
