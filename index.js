import express from "express"
import urlRoute from "./routes/urlRoute.js"
import connectToMongoDb from "./connect.js"
// import URL from "./models/urlSchema.js"
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config();

const app = express()
app.use(express.json())

app.use(cors({origin:"*"}))

const PORT = 3000
// connectToMongoDb("mongodb://localhost:27017/short-url").then(()=> console.log("mongoDb connected"))

const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = "GenerateShortURL"
const uri =  `mongodb+srv://${username}:${password}@cluster0.3j0ywmp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

connectToMongoDb(uri).then(()=>{
    console.log("connect to mongodb")
}).catch((err)=>{
    console.log(err)
})


app.use("/api/shortUrl", urlRoute)

app.listen(PORT, ()=> console.log(`Server Started at PORT:${PORT}`))