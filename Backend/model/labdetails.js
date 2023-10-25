import mongoose from "mongoose";

const labDetailsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  CenterName: {
    type: String,
    required: true,
  },

  ContactNumber: {
    type: Number,
    required: true,
  },

  PinCode: {
    type: Number,
    required: true,
  },

  BuildingName: {
    type: String,
    required: true,
  },

  Area: {
    type: String,
    required: true,
  },

  LandMark: {
    type: String,
    required: true,
  },

  Place: {
    type: String,
    required: true,
  },

  City: {
    type: String,
    required: true,
  },

  State: {
    type: String,
    required: true,
  },

  isSubmitted: {
    type: Boolean,
    default: false,
  },

  CenterImages: [
    {
      type: String,
      required: true,
    },
  ],

  CertificateImages: [
    {
      type: Object,
      required: true,
    },
  ],

  isVerified: {
    type: Boolean,
    default: false,
  },

  reject: {
    type: Boolean,
    default: false,
  },

  rejectMessage: {
    type: String,
  },

  isContinue: {
    type: Boolean,
    default: false,
  },

  type:{
    type:String,
    default: "LabCentre",

  }

});

export default mongoose.model('labdetail',labDetailsSchema)
