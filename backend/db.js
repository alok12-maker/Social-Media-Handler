const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.URL ).
then( ()=>{
    console.log('Connected succesfully');
})
.catch((error)=>{
    console.log('error',error);
});

const db = mongoose.connection;

db.on('disconnected', function() {
    console.log('MongoDB connection disconnected');
  });
  
  // Connection reconnected event
  db.on('error', function(err) {
    console.log('MongoDB connection reconnected' , err);
  });
  
  // Connection connected event
  db.on('connected', function() {
    console.log('MongoDB connection connected');
  });

module.exports = db;