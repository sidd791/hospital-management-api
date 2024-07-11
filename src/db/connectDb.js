import mongoose from "mongoose"

const connectDb = async function(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/HospitalManagement`)
        console.log("Connected to the database")
    } catch (error) {
        console.log("Error : ", error)
    }
}
export default connectDb