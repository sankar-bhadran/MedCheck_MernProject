import mongoose from "mongoose";

const labTestSchema=new mongoose.Schema({
    Lab:{
        type:mongoose.Types.ObjectId,
        ref:"labdetail"
    },

    LabOwnerId:{
        type:String
    },

    mainCategory:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    }
})

export default mongoose.model('labtestModel',labTestSchema)