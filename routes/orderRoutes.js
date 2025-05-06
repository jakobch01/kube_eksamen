
const express = require('express');
const Order = require('../models/Order');
const Car = require('../models/Car');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { carId, quantity } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const totalPrice = car.price * quantity;

    const newOrder = new Order({
      carId,
      quantity,
      totalPrice,
      status: "pending", // default status
      orderDate: new Date()
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Fejl ved oprettelse af ordre:", err);
    res.status(500).json({
      message: "Error creating order",
      error: err.errors || err.message || err.toString()
    });
  }
});


router.get('/', async (req, res) => { 
    try {
        // Fetch all orders from MongoDB
        const orders = await Order.find();  
        
        // Return orders as JSON
        res.json(orders);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });  
    }
});

router.get ('/:id', async (req, res) => { 
    try {
        const order = await Order.findById(req.params.id);
        
        // If the order is not found, return a 404 error
        if (!order) return res.status(404).json({ message: 'Order not found' });
        
        // Return the found order
        res.status(200).json(order);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error }); 
    }
});

router.patch('/:id', async (req, res) => { 
    try {
        // Find and update the order using ID
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder); 
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error }); 
    }
});

router.delete('/:id', async (req, res) => { 
    try {
        // Find and delete the order using ID
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if(!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' }); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error }); 
    }
});

module.exports = router;