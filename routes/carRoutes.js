const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// Opret en ny bil (POST)
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
    
        const newCar = new Car(req.body);  
        
        // Gem den nye bil i MongoDB
        await newCar.save();  

        // Returner den gemte bil
        res.status(201).json(newCar);  
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating car', 
            error }); 
    }
});

// Hent alle biler (GET)
router.get('/', async (req, res) => {
    try {
        // Hent alle biler fra MongoDB
        const cars = await Car.find();  
        // Returner biler som JSON
        res.json(cars);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });  
    }
});

// Hent en bil efter ID (GET /:id)
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        // Hvis bilen ikke findes, returner en 404 fejl
        if (!car) return res.status(404).json({ message: 'Car not found' });

        // Returner den fundne bil
        res.status(200).json(car);  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car', error }); 
    }
});

// Opdater en bil (PATCH /:id)
router.patch('/:id', async (req, res) => {
    try {
        // Find og opdater bilen ved hjælp af ID
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Hvis bilen ikke findes, returner en 404 fejl
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });

        // Returner den opdaterede bil
        res.status(200).json(updatedCar);  
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }
});

// Slet en bil (DELETE /:id)
router.delete('/:id', async (req, res) => {
    try {
        // Find og slet bilen ved hjælp af ID
        const deletedCar = await Car.findByIdAndDelete(req.params.id);

        // Hvis bilen ikke findes, returner en 404 fejl
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });

        // Returner en succes-status
        res.status(204).send({ message: 'Car deleted successfully' });  
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error });
    }
});

module.exports = router;
