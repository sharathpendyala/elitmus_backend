const express = require("express")
const userapi=express.Router()

userapi.post("/create-user",(req,res)=>{
    res.send({message:"product is created"})
    console.log(req.body)
})

module.exports = userapi;