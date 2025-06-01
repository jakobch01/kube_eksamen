const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const mongoURI = process.env.MONGO_URI;



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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server sdadsad is running on http://0.0.0.0:${PORT}`);
});
