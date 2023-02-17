// Node modules
const express = require('express');

// Third party modules
const morgan = require('morgan');

// User defined modules
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Morgan for logging req object (Only in case of development phase)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('short'));
}

app.use(express.json()); //middleware for setting body on the req object from the request data

app.use((req, res, next) => {
    console.log('Middleware for all paths');
    next();
});

// listening to get method
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use('/public', express.static(`${__dirname}/public`));

module.exports = app;
