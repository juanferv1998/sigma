const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test-sigma')
        .then(db => console.log('DB esta on'))
        .catch(err => console.error(err))
const app = express();


// Settings del servidor
app.set('port', process.env.port || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/contacts', require('./routes/contacts'));
//Static files

app.use(express.static(__dirname + '/public'))

// Server is listening
app.listen(app.get('port'), () =>{
    console.log('server on port',app.get('port'));
}) ;