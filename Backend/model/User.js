import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    phonenumber: {
      type: Number,
      unique: true,
    },

    password: {
      type: String,
    },

    is_admin: {
      type: Number,
    },

    emailtoken: {
      type: String,
    },

    userType: {
      type: String,
    },

    is_blocked: {
      type: Boolean,
      default: false,
    },

    addressDetails: [
      {
        type: mongoose.Types.ObjectId,
        ref: "address",
      },
    ],
  }

  //  timestamps: true }
);

export default mongoose.model("user", Userschema);
