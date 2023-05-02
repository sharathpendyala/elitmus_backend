const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const myurl = process.env.DATABASE
var bcrypt = require('bcryptjs');
const port= process.env.PORT || 5000

const cors=require("cors")
app.use(cors())


app.use(express.json())
mongoose.connect(myurl).then(() => {
    console.log("connection successfull")
}).catch(() => {
    console.log("error!!");
    console.log(process.env.DATABASE)
})

//For registration
const User = require("./User");
app.post("/create-user", async (req, res) => {

    const { Fullname,email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secretepass = await bcrypt.hash(password, salt);

    if (!Fullname || !email || !password) {
        return res.status(422).json({ success:false, error: "fill the feild properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({success:false, error: "user already exists" });
        }
        else {
            const user = await User.create({
                Fullname:Fullname,
                email:email,
                password:secretepass
            })
            res.status(201).json({success:true})
        }
    }
    catch (err) {
        console.log(err);
    }
})

//for login

app.post("/login-user", async (req, res) => {

    const { email, password } = req.body;


    if ( !email || !password) {
        return res.status(422).json({ success:false, error: "fill the feild properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(422).json({ success:false, error: "user Doesnt exist" });
        }
        else {
            const pass= await bcrypt.compare(password,userExist.password);
            if(!pass){
                return res.status(422).json({success: false,passtatus:pass, user:userExist.email,error:"Enter correct password"})
            }
            else{
                return res.status(201).json({success:true})
            }
        }
    }
    catch(err) {
        console.log(err);
    }
})


app.listen(port, () => console.log(`Hello server started! on port ${port}`))