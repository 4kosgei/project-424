const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

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
    // Your user registration logic here
});

// Route for user login
app.post('/login/user', (req, res) => {
    // Your user login logic here
});

// Route for librarian registration
app.post('/register/librarian', (req, res) => {
    // Your librarian registration logic here
});

// Route for librarian login
app.post('/login/librarian', (req, res) => {
    // Your librarian login logic here
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
