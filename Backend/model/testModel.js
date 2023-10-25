import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  Lab: {
    type: mongoose.Types.ObjectId,
    ref: "centerdetail",
  },

  LabUserId: {
    type: String,
  },

  mainCategory: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("testModel", testSchema);
