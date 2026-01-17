import mongoose from "mongoose";

//  Establish Connection Code for mongo db
const connectDb = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Db Connect Successfully..");
    }
    catch(err){
        console.log("Database Connection Failed : ",err);
    }
}

export default connectDb;