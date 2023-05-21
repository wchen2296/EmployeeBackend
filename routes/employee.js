const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
