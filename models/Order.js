const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({ 
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);
