const express = require('express');
const cookieParser = require('cookie-parser');

const app=express();

app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("Server created")
});


module.exports = app;