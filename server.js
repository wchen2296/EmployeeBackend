const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./models/index'); 
const employeeRoutes = require('./routes/employee'); 
const taskRoutes = require('./routes/task'); 
const cors = require('cors');




// Sync the models with the database
sequelize.sync()
  .then(() => console.log('Database & tables created!'));


const app = express();


const port =  3001;

app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({ message: "Welcome to your application." });
});

// Use routes
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        stack: req.app.get('env') === 'development' ? err.stack : {}
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
