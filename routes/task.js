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

// GET single task with its employee
router.get('/:id', async (req, res) => {
    try {
      const task = await Task.findOne({
        where: { id: req.params.id },
        include: [Employee]
      });
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// POST a new task
router.post('/', async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT (update) a task
  router.put('/:id', async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        await task.update(req.body);
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found!' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // DELETE a task
  router.delete('/:id', async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (task) {
        await task.destroy();
        res.json({ message: 'Task deleted successfully!' });
      } else {
        res.status(404).json({ message: 'Task not found!' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;
