const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => { 
    console.log(req.body);
    const newOrder = new Order(req.body);
    try {
        // Save the new order to MongoDB
        await newOrder.save();  
        
        // Return the saved order
        res.status(201).json(newOrder);  
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating order', 
            error }); 
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