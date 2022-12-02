const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const Port =process.env.PORT ||4000
const morgan=require('morgan')
const bodyparser=require('body-parser')
const cors=require('cors')
const fs=require('fs')

const mongo=require('mongodb')
let MongoClient=mongo.MongoClient
let mongoUrl=process.env.MongoLive
let db;


app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send('Hi I am live')
})
app.post('/message',(req,res)=>{
console.log(req.body)
db.collection('data').insertOne({
    "name":req.body.name,
    "email":req.body.email,
    "phone":Number(req.body.phone),
    "message":String(req.body.message)
},(err,result)=>{
    if(err) return res.send("error while submitting")
    res.send("message successfully sent to the sanket")
    
})
    
   

})



// connection with mongodb
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("error while connecting")
     db=client.db('portfolio')
    app.listen(Port,()=>{
        console.log(`the server is start successfully in the port ${Port}`)
    })
})

