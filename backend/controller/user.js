// In-memory user data for demonstration purposes
const jwt = require('jsonwebtoken');


let users = [
  { username: 'admin', password: 'admin_password', role: 'admin' },
  { username: 'user', password: 'user_password', role: 'user' }
];

const login = (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token with user information and role
    const token = jwt.sign({ username, role: user.role }, 'your_secret_key');

    // Store token in a cookie
    res.cookie('token', token, { httpOnly: true });

    return res.json({ message: 'Login successful', token, role: user.role });
};

// Add User function
const addUser = (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    return res.json({ message: 'User added successfully' });
};

// Update User function
const updateUser = (req, res) => {
    const { username } = req.params;
    const updatedUser = req.body;
    users = users.map(user => (user.username === username ? { ...user, ...updatedUser } : user));
    return res.json({ message: 'User updated successfully' });
};

// Signup User function
const signupUser = (req, res) => {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Add the new user to the list
    users.push({ username, password, role });

    return res.json({ message: 'User registered successfully' });
};

// Delete User function
const deleteUser = (req, res) => {
    const { username } = req.params;
    users = users.filter(user => user.username !== username);
    return res.json({ message: 'User deleted successfully' });
};

module.exports = { login, addUser, updateUser, signupUser, deleteUser };