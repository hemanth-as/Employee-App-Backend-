var Mongoose=require("mongoose");

const employeeSchema=Mongoose.Schema(
    {
        name: String,
        position: String,
        location: String,
        admissionNo: Number
    }
);

var employeeModel= Mongoose.model("employeeDetails",employeeSchema);
module.exports={employeeModel};