const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({ 
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
