const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


// Middleware
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bilDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
