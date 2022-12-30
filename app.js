// Task1: initiate app and run server at 3000
let express = require("express");
let Mongoose = require("mongoose");
let Bodyparser =require("body-parser");
let Cors = require("cors");
const path=require('path');
const {employeeModel}=require("")
let app=new express();

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));

app.use(Cors());

Mongoose.connect("mongodb+srv://heman:ATLASsecretC0DE@cluster0.mksxcra.mongodb.net/EmployeeDB?retryWrites=true&w=majority",
{useNewUrlParser: true}
);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist",async(req,res)=>{
    try{
    let data = await employeeModel.find()
    res.send(data);
     console.log("Started successfully");
    }
    catch{
     res.status(400).json({message:err.message})
 }
     
 });
 
//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id",async(req,res)=>{
    try{
        let id=req.params.id;
        let data= await employeeModel.findOne({"_id":id})
        res.send(data)
    }
    catch{
        res.status(400).json({message:err.message})
    }
});

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",async(req,res)=>{
    let data = {
        name : req.body.name,
        location :  req.body.location,
        position :  req.body.position,
        salary :  req.body.salary
    }
    let employee = new employeeModel(data);
try{
    let postedData =  await employee.save();
    res.send(postedData);
    console.log(req.body);
}
catch{
    res.status(400).json({message:err.message})
}
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",async(req,res)=>{
    try{
        let data = req.body;
        id = req.params.id;
        const updatedResult = await  employeeModel.findByIdAndDelete({"_id":id},data);
        res.send(updatedResult)
    }
    catch{
        res.status(400).json({message:err.message})
    }
   
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",async(req,res)=>{
    try{
        let data = {
            name : req.body.name,
            location :  req.body.location,
            position :  req.body.position,
            salary :  req.body.salary,
        };
  
        let id = req.body._id;
      const updatedResult = await  employeeModel.findOneAndUpdate({"_id":id},data)
      res.send(updatedResult)
    }
    catch{
        res.status(400).json({message:err.message})
    }
   
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log("Server started listening to port 3000");
})