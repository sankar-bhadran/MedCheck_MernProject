import mongoose from "mongoose";

const scanCenterSlotSchema=new mongoose.Schema({
  
  labId:{
    type:mongoose.Types.ObjectId,
    ref:"centerdetail"
  },

  addedDate:{
    type:Date
  },

  addedSlote:{
    
  }


})