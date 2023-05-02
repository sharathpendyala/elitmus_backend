const express = require("express")
const productapi=express.Router()

productapi.post("/create-product",(req,res)=>{
    res.send({message:"product is created"})
    console.log(req.body)
})

module.exports = productapi;