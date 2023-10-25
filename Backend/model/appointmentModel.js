import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  labId: {
    type: mongoose.Types.ObjectId,
    ref: "centerdetail",
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  patientName: {
    type: String,
  },

  dateOfBirth: {
    type: Date,
  },

  gender: {
    type: String,
  },

  mobilenumber: {
    type: Number,
  },

  email: {
    type: String,
  },

  payment: {
    type: String,
  },

  bookedDate: {
    type: Date,
  },

  bookedTime: {
    type: String,
  },

  testDetails: {
    item: [
      {
        TestId: {
          type: mongoose.Types.ObjectId,
          ref: "testModel",
        },
        description: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },

  status: {
    type: String,
    default: "In process",
  },

  type: {
    type: String,
  },
});

export default mongoose.model("appointment", appointmentSchema);
