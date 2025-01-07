// Initialization 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const sequelize = require('./Database/db')

//creating server 
const app = express();


app.get('/',(req,res) =>{
    res.send("Welcome to webpage")
})


app.get('/notice',(req,res) =>{
    res.send("This is notice")
})



//creating port 
const PORT = 5000;


//Creating middleware 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Running port 
app.listen(PORT,() => {
    console.log(`sever starting at port ....... ${PORT}`)
})