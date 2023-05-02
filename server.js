
const myurl1="mongodb+srv://sharath:vnr2024@cluster0.tv51ued.mongodb.net/mydatabase?retryWrites=true&w=majority"

const mongoose = require("mongoose")

mongoose.connect(myurl1,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log("error in connection")
})
