const express = require("express");
const app = express();
const cors = require('cors');
const db = require("./db");
const dotenv = require('dotenv');
dotenv.config();


const path = require('path');
// Middleware to serve favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end());

const userRoute=require('./routes/userRoute')
app.use(express.json());

// Middleware to handle CORS
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',userRoute);





const port = process.env.PORT || 8000 ;
app.listen(port ,()=>{
    console.log("Server is running ");
})

