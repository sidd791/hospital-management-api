import mongoose, { Schema } from "mongoose"

const reportSchema = Schema({
    name : {
        type : Schema.Types.ObjectId,
        ref : "Patient"
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'Doctor'
    },
    status : {
        type : String,
        enum : ['Negative', 'Travelled - Quarantine', 'Symptoms - Quarantine', 'Positive - Admit']
    }
}, {timestamps : true})

export const Report = mongoose.model("Report", reportSchema)