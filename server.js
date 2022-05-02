const express = require('express')
const mongoose  = require('mongoose')
const BrandName = require('./model')
const app = express();
app.use(express.json())

mongoose.connect('mongodb+srv://saiprakash:saiprakash@cluster0.21hkt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=> console.log("DB connected...")
).catch(err => console.log(err))

app.post('/addBrands',async (req,res)=>{
    const {brandname,price} = req.body;
    try{
        const newData = new BrandName({brandname,price});
        await newData.save();
        return res.json(await BrandName.find())
    }catch(err){
        console.log(err.message);
    }
})

app.get('/getAllbrands',async (req,res)=>{
    try{
        const allData = await BrandName.find()
        return res.json(allData)
    }catch(err){
        console.log(err.message)
    }
})

app.get('/getAllbrands/:id',async(req,res)=>{
    try{
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data)
    }catch(err){
        console.log(err.message)
    }
})

app.delete('/deleteBrand/:id', async(req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id)
        return res.json(await BrandName.find())
    }catch(err){
        console.log(err.message)
    }
})
app.listen(3000,()=> console.log("Server running..."))