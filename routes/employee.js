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

// POST a new employee
router.post('/', async (req, res) => {
    try {
      const employee = await Employee.create(req.body);
      res.status(201).json(employee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT update an employee's details
  router.put('/:id', async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.update(req.body);
        res.json(employee);
      } else {
        res.status(404).json({ message: 'Employee not found.' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE an employee
  router.delete('/:id', async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.destroy();
        res.json({ message: 'Employee deleted.' });
      } else {
        res.status(404).json({ message: 'Employee not found.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });





module.exports = router;
