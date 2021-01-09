require('express-async-errors');
const comment = require('./routes/comments.js');
const auth = require('./routes/auth.js');
const user = require('./routes/users.js');
const errorHandler = require('./middleware/error.js');
const express = require('express');
const app =  express();

app.use(express.json());
app.use('/login', auth);
app.use('/register', user);
app.use('/comments',comment);
app.use(errorHandler);

app.listen(8000,() => console.log('Starting Server'));