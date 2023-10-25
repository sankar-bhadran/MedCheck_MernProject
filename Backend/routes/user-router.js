import express from "express";
import {
  signup,
  verifyotp,
  sendotp,
  forgotpassword,
  resetpassword,
  logout,
  getuser,
  updateProfile,
  address,
  deleteAddress,
  addToCart,
  removeFromCart,
  scanCenterDetails,
  fetchLocations,
  orders,
  verifypayment,
  labAddToCart,
  labRemoveFromCart,
  labCenterDetails,
} from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { blockUser } from "../middleware/blockUserMiddleware.js";
import { login } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.post("/sentotp", sendotp);
userRouter.post("/signup", verifyotp, signup);
userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgotpassword);
userRouter.post("/resetpassword", resetpassword);
userRouter.get("/userprofile", verifyToken, getuser);
userRouter.patch("/userprofile", verifyToken, updateProfile);
userRouter.post("/addaddress", verifyToken, address);
userRouter.patch("/deleteaddress", verifyToken, deleteAddress);
userRouter.post("/resendotp", verifyToken, sendotp);
userRouter.post("/addtocart", verifyToken, addToCart);
userRouter.post('/labaddtocart',verifyToken,labAddToCart)
userRouter.post("/removefromcart", verifyToken, removeFromCart);
userRouter.post('/labremovfromcart',verifyToken,labRemoveFromCart)
userRouter.get("/scandetails/:id", verifyToken, scanCenterDetails);
userRouter.get('/labdetails/:id',verifyToken,labCenterDetails)
userRouter.get("/fetchlocations", verifyToken, fetchLocations);
userRouter.get("/paymentorders", verifyToken, orders);
userRouter.post("/paymentverify", verifyToken, verifypayment);
userRouter.get("/logout", verifyToken, logout);
export default userRouter;
