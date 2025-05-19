const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const mongoURI = process.env.MONGO_URI | 'mongodb://localhost:27017/bilDB';



// Middleware
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Error connecting to database:', err));

// Routes
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
