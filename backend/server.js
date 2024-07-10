const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User=require('./models/user.js')

const app = express();
const PORT = process.env.PORT || 5000;

const config = require('./config/config');

mongoose.connect("mongodb+srv://dhruv:dhruv@register-system.wazmwbb.mongodb.net/?retryWrites=true&w=majority&appName=register-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth.js');
const protectedRoutes = require('./routes/protectedRoute.js');

app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// server-side API endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
