const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index'); 
const Employee = require('./models/employee'); 
const Task = require('./models/task'); 

// Sync the models with the database
sequelize.sync()
  .then(() => console.log('Database & tables created!'));

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT || 3001;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to your application." });
});

// An example route for all employees
app.get('/employees', async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        next(err);
    }
});

// Handle not found error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        stack: req.app.get('env') === 'development' ? err.stack : {}
    });
});

// Start your express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
