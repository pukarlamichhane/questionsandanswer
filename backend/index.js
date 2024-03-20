const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser module
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware

// In-memory user data for demonstration purposes
let users = [
  { username: 'admin', password: 'admin_password', role: 'admin' },
  { username: 'user', password: 'user_password', role: 'user' }
];

const items = [
  {
    id: 1,
    name: 'Item1',
    category:"runnig shoes",
    image:"",
    variants: [
      { size: 32, price: 10.99, quantity: 50 },
      { size: 33, price: 12.99, quantity: 40 },
      { size: 34, price: 15.99, quantity: 30 }
    ]
  }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create a JWT token with user information and role
  const token = jwt.sign({ username, role: user.role }, 'your_secret_key');

  // Store token in a cookie
  res.cookie('token', token, { httpOnly: true }); // Store token in a cookie

  return res.json({ message: 'Login successful', token, role: user.role });
});

// Middleware to check user role before accessing routes
const checkRole = (role) => (req, res, next) => {
  const token = req.cookies.token; // Access token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    if (decoded.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  });
};

// Protected routes based on user roles
app.get('/user-panel', checkRole('user'), (req, res) => {
  return res.json({ message: 'Access granted to user panel' });
});

app.get('/admin-panel', checkRole('admin'), (req, res) => {
  return res.json({ message: 'Access granted to admin panel' });
});

// Add User
app.post('/add-user', checkRole('admin'), (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  return res.json({ message: 'User added successfully' });
});

// Update User
app.put('/update-user/:username', checkRole('admin'), (req, res) => {
  const { username } = req.params;
  const updatedUser = req.body;
  users = users.map(user => (user.username === username ? { ...user, ...updatedUser } : user));
  return res.json({ message: 'User updated successfully' });
});

// Signup User
app.post('/signup', (req, res) => {
  const { username, password, role } = req.body;

  // Check if username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Add the new user to the list
  users.push({ username, password, role });

  return res.json({ message: 'User registered successfully' });
});

// Delete User
app.delete('/delete-user/:username', checkRole('admin'), (req, res) => {
  const { username } = req.params;
  users = users.filter(user => user.username !== username);
  return res.json({ message: 'User deleted successfully' });
});


app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  const product = items.find(item => item.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json(product);
});

// Update Product by ID
app.put('/product/:id', (req, res) => {
  const { id } = req.params;
  const { name, variants } = req.body;

  const productIndex = items.findIndex(item => item.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  items[productIndex] = { id: parseInt(id), name, variants };

  return res.json({ message: 'Product updated successfully' });
});

// Delete Product by ID
app.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = items.findIndex(item => item.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  items.splice(productIndex, 1);
  return res.json({ message: 'Product deleted successfully' });
});

// Add Product
app.post('/product', (req, res) => {
  const { name, variants } = req.body;
  const id = items.length + 1;
  items.push({ id, name, variants });
  return res.json({ message: 'Product added successfully', id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
