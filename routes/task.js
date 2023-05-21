const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;