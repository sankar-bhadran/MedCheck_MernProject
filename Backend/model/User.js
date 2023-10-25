import mongoose from "mongoose";
import testModel from "./testModel.js";
import labtestModel from "./labtestModel.js";

const Userschema = new mongoose.Schema({
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

  testCart: {
    item: [
      {
        TestId: {
          type: mongoose.Types.ObjectId,
          // ref: "testModel",
          required: true,
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
});

Userschema.methods.addToCart = function (testModel) {
  const cart = this.testCart;
  const isExisting = cart.item.findIndex((objInItems) => {
    return (
      new String(objInItems.TestId).trim() == new String(testModel._id).trim()
    );
  });

  if (isExisting) {
    cart.item.push({ TestId: testModel._id, price: testModel.price,description:testModel.description });
  }
  cart.totalPrice += testModel.price;
  console.log(cart.totalPrice);
  console.log(typeof testModel.price);
  return this.save();
};

Userschema.methods.removefromCart = async function (TestId) {
  const cart = this.testCart;
  console.log(cart)
  const isExisting = cart.item.findIndex((objInItems) => {
    return new String(objInItems.TestId).trim() === new String(TestId).trim();
  });
  console.log(isExisting)
  console.log(TestId)
  if (isExisting >= 0) {
    const test = await testModel.findById(TestId);
    console.log(test)
    cart.totalPrice -= test.price;

    cart.item.splice(isExisting, 1);
    return this.save();
  }
};
Userschema.methods.labRemovefromCart = async function (TestId) {
  const cart = this.testCart;
  console.log(cart)
  const isExisting = cart.item.findIndex((objInItems) => {
    return new String(objInItems.TestId).trim() === new String(TestId).trim();
  });
  console.log(isExisting)
  console.log(TestId)
  if (isExisting >= 0) {
    const test = await labtestModel.findById(TestId);
    console.log(test)
    cart.totalPrice -= test.price;

    cart.item.splice(isExisting, 1);
    return this.save();
  }
};

export default mongoose.model("user", Userschema);
