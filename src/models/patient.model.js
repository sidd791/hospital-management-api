import mongoose, { Schema } from "mongoose"

const patientSchema = Schema({
    fullname : {
        type : String,
        required : String
    }, 
    phNo : {
        type : String,
        required : true,
        unique : [true, "User already exists"]
    },
    reports : {
        type : Schema.Types.ObjectId,
        ref : "Report"
    }
}, {timestamps : true})

export const Patient = mongoose.model("Patient", patientSchema)