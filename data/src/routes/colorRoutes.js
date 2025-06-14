const express = require('express');
const router = express.Router();
const ColorData = require('../models/ColorData');

// GET the most recent color data
router.get('/latest', async (req, res) => {
  console.log('GET /latest request received');
  try {
    const latestData = await ColorData.findOne()
      .sort({ timeStamp: -1 })
      .limit(1);
    
    console.log('Query result:', latestData);
    
    if (!latestData) {
      console.log('No data found');
      return res.status(404).json({ message: 'No color data found' });
    }
    
    console.log('Sending response:', latestData);
    res.json(latestData);
  } catch (error) {
    console.error('Error in GET /latest:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new color data
router.post('/', async (req, res) => {
  console.log('POST / request received with body:', req.body);
  try {
    console.log(req.body);
    const newColorData = new ColorData({
      colorChoices: req.body.colorChoices,
      timeStamp: Date.now()
    });

    console.log('Attempting to save:', newColorData);
    const savedData = await newColorData.save();
    console.log('Data saved successfully:', savedData);
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error in POST /:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 