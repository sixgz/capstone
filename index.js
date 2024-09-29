const express = require('express');
const cors = require('cors');
const app = express();

// Example: You could load this list from a database or environment variables
let allowedOrigins = ['https://example1.com', 'https://example2.com'];

// Function to dynamically add/remove domains to the allowed origins
const updateAllowedOrigins = (newOrigin) => {
    if (!allowedOrigins.includes(newOrigin)) {
        allowedOrigins.push(newOrigin);
    }
};

app.use(cors({
    origin: function (origin, callback) {
        // If there is no origin or it's in the allowed list, allow the request
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // If the origin is not allowed, block the request
        return callback(new Error('Not allowed by CORS'), false);
    }
}));

// Route to add a new origin dynamically (for demonstration purposes)
app.post('/add-origin', (req, res) => {
    const newOrigin = req.body.origin;  // In production, validate this input properly
    updateAllowedOrigins(newOrigin);
    res.json({ message: `Origin ${newOrigin} added successfully` });
});

// Sample API route
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is secure API data' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});