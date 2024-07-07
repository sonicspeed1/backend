const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restaurante')
.then(db=>console.log('Database is Connect'))
.catch(err=>console.log(err))