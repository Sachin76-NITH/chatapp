const express=require("express");
const app=express();

const dotenv=require("dotenv");
dotenv.config();

const PORT=process.env.PORT|| 5050;

const mongoose =require("mongoose")
mongoose.connect(process.env.CONNECTION_URL,{useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=> console.log(`server is running on port :${PORT}`)))
.catch((error)=>console.log(error.message));

const cors=require("cors")


const userRoutes=require("./routes/userRoutes")
const chatRoutes =require("./routes/chatRoutes")
const messageRoutes=require("./routes/messageRoutes")

app.use(cors());
app.use(express.json())


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)


// app.get('/',(req,res)=>{
//     res.send("app");
// })





app.listen(5000,console.log(`server is running ${PORT}`));