import User from "../model/User.js";
import appointmentModel from "../model/appointmentModel.js";
import ScanCenter from "../model/centerdetails.js";
import LabCenter from "../model/labdetails.js";
import Location from "../model/locationModel.js";
import Address from "../model/addressModel.js";
import LabTestModel from "../model/labtestModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import Razorpay from "razorpay";
import crypto from "crypto";
import testModel from "../model/testModel.js";
const accountSid = "AC6ffd98d07b09c3795988fca455810836";
const authToken = "e667ea90d9fc4f925dfc0557ef214bd1";
const servicessid = "VA6a2a14ec6072a70983306c795d3c2737";
const client = twilio(accountSid, authToken);

// const API_KEY = process.env.MAILGUN_KEY;
// const DOMAIN = "sandbox26ed882f64174073a36893ea729b3da5.mailgun.org";
// import Mailgun from "mailgun-js";
// const mgclient = new Mailgun({ apiKey: API_KEY, domain: DOMAIN });

export const sendotp = async (req, res) => {
  const { phonenumber, email } = req.body;
  let user;
  try {
    user = await User.findOne({
      $or: [{ email: email }, { phonenumber: phonenumber }],
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist!Login instead" });
    } else {
      console.log("else case");
      const otpResponse = "1234";
      // const otpResponse = await client.verify.v2
      //   .services(servicessid)
      //   .verifications.create({ to: `+91${phonenumber}`, channel: "sms" });
      // console.log(otpResponse);
      res.status(200).send(`OTP successful: ${JSON.stringify(otpResponse)}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password, phonenumber, userType } = req.body;

  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      email,
      phonenumber,
      password: hashedpassword,
      userType,
      is_admin: 0,
    });

    await user.save();
    return res.status(200).json({ message: "SignUp Successfully", user });
  } catch (error) {
    next(error);
  }
};



export const verifyotp = async (req, res, next) => {
  const { otp, phonenumber } = req.body;

  try {
    const verifiedResponse = {};
    verifiedResponse.status = otp === "1234" ? "approved" : "";
    // const verifiedResponse = await client.verify.v2
    //   .services(servicessid)
    //   .verificationChecks.create({
    //     to: `+91${phonenumber}`,
    //     code: otp,
    //   });
    if (verifiedResponse.status === "approved") {
      next();
    } else {
      console.log("123456");
      return res.status(400).json({ message: "OTP verification failed." });
    }
  } catch (error) {
    return res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
    console.log("existinguser", existinguser);

    if (!existinguser) {
      return res.status(400).json({ message: "User not found Signup please" });
    }

    if (existinguser.is_blocked) {
      return res.status(401).json({ message: "Blocked by admin" });
    }

    const haspassword = bcrypt.compareSync(password, existinguser.password);
    if (!haspassword) {
      return res.status(400).json({ message: "Invalid email and password" });
    }

    const token = jwt.sign(
      { _id: existinguser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    const expirationTime = new Date(Date.now() + 1000 * 60 * 60);
    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      expires: expirationTime,
    });

    return res
      .status(200)
      .json({ message: "Successfully Logged In", token, existinguser });
  } catch (error) {
    next(error);
  }
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email is not  exists" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });
    await User.findOneAndUpdate({ email }, { $set: { emailtoken: token } });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "MedCheckIn",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: `${user.username}`,
        intro: "Welcome to MedCheckIn! Verify your email.",
        action: {
          instructions: `Hello ${user.username} verify your email by clicking this link....`,
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${process.env.CLIENT_URL}/resetpassword?token=${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    let mail = MailGenerator.generate(response);

    let mailOptions = {
      from: '"Medcheckin" <brocamptvm@gmail.com>',
      to: email,
      subject: "verification Mail!",
      html: mail,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("error sending email", err);
        return res.status(400).json({ message: "error sending email" }, err);
      } else {
        res.status(200).json({ message: "email sent successfully" });
        console.log("email sent successfully");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetpassword = async (req, res) => {
  try {
    const { emailtoken, password } = req.body;
    if (!emailtoken) {
      return res.status(400).json({ message: "Missing email token" });
    }
    const decoded = jwt.verify(emailtoken, process.env.RESET_PASSWORD_KEY);
    const userId = decoded._id;
    const userdetails = await User.findById({ _id: userId });

    if (!userdetails) {
      return res.status(401).json({ message: "User not found" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    userdetails.password = hashedpassword;
    userdetails.emailtoken = null;
    await userdetails.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getuser = async (req, res) => {
  const userid = req.user;
  let user;
  try {
    if (!userid) {
      return res.status(404).json({ message: "User not found" });
    }

    user = await User.findById({ _id: userid }).populate("addressDetails");
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({ message: "User Found", user });
};

export const updateProfile = async (req, res) => {
  const userid = req.user;
  const { username, email, phonenumber } = req.body;
  console.log(req.body);
  try {
    const userUpdate = await User.findByIdAndUpdate(userid, {
      $set: { username, email, phonenumber },
    });
    console.log(userUpdate);
    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", userUpdate });
  } catch (error) {
    console.log(error.message);
  }
};

export const address = async (req, res) => {
  const userid = req.user;
  const { House, Area, city, state, pincode, defaultaddress } = req.body;
  try {
    const addressData = new Address({
      userID: userid,
      house: House,
      area: Area,
      city: city,
      state: state,
      pincode: pincode,
      defaultaddress: defaultaddress,
    });
    const address = await addressData.save();
    const addedAddress = await Address.findOne({ userID: userid });
    await User.updateOne(
      { _id: userid },
      { $push: { addressDetails: address._id } }
    );
    console.log("addressData", address);
    return res
      .status(201)
      .json({ message: "Address added successfully", address });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while saving the address data" });
  }
};

export const deleteAddress = async (req, res) => {
  const { addressId } = req.body;

  try {
    const deletedAddress = await Address.findByIdAndDelete({ _id: addressId });
    const fetchAddress = await Address.findById({ _id: addressId });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res
      .status(200)
      .json({ message: "Address deleted successfully", deletedAddress });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the address" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    console.log("addtocart req.body", id);
    const userid = req.user;
    console.log("userid", userid);
    const userData = await User.findById({ _id: userid });
    const testData = await testModel.findById({ _id: id });
    userData.addToCart(testData);
    return res.status(200).json({ userData, message: "Added To cart" });
  } catch (error) {
    console.error("Error in searchDetails:", error);
  }
};

export const labAddToCart = async (req, res) => {
  try {
    const { id } = req.body;
    const userid = req.user;
    const userData = await User.findById({ _id: userid });
    const testData = await LabTestModel.findById({ _id: id });
    userData.addToCart(testData);
    return res.status(200).json({ userData, message: "Added To Cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    console.log("addtocart req.body", id);
    const userid = req.user;
    const userData = await User.findById({ _id: userid });
    console.log("userData", userData);

    await userData.removefromCart(id);
    console.log("removecart", userData.testCart.item);
    return res.status(200).json({ userData, message: "Removed from cart" });
  } catch (error) {
    console.error("Error in searchDetails:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const labRemoveFromCart = async (req, res) => {
  try {
    const { id } = req.body;
    const userid = req.user;
    const userData = await User.findById({ _id: userid });
    await userData.labRemovefromCart(id);
    return res.status(200).json({ userData, message: "Removed from Cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const scanCenterDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const scanCenterDetails = await ScanCenter.findById({ _id: id });
    return res
      .status(200)
      .json({ scanCenterDetails, message: "Data fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const labCenterDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const labCenterDetails = await LabCenter.findById({ _id: id });
    return res
      .status(200)
      .json({ labCenterDetails, message: "Data fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchLocations = async (req, res) => {
  try {
    const fetchedlocations = await Location.find();
    return res
      .status(200)
      .json({ fetchedlocations, message: "Data fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const orders = async (req, res) => {
  const userid = req.user;
  console.log("is", userid);
  try {
    const userData = await User.findOne({ _id: userid });
    const totalPrice = userData.testCart.totalPrice;
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

export const verifypayment = async (req, res) => {
  const userid = req.user;
  try {
    console.log("req.body", req.body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      id,
      patientname,
      dateOfbirth,
      gender,
      date,
      slot,
      mobilenumber,
      email,
    } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const userData = await User.findById({ _id: userid });
      const completeCartItems = await userData.populate("testCart.item.TestId");
      let types;
      const centerstype = await ScanCenter.findById({ _id: id });
      if (centerstype) {
        types = centerstype.type;
      } else {
        const labtype = await LabCenter.findById({ _id: id });
        types = labtype.type;
      }

      const appointments = new appointmentModel({
        labId: id,
        userId: userid,
        patientName: patientname,
        dateOfBirth: dateOfbirth,
        gender,
        bookedDate: date,
        bookedTime: slot,
        mobilenumber,
        email,
        testDetails: completeCartItems.testCart,
        type: types,
      });
      await appointments.save();
      await User.updateOne(
        { _id: userid },
        { $set: { "testCart.item": [], "testCart.totalPrice": "0" } }
      );
      return res
        .status(200)
        .json({ appointments, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

export const successDetails = async (req, res) => {
  try {
    const id = req.params.appointmentId;
    const appointmentDetails = await appointmentModel.findById({ _id: id });
    return res
      .status(200)
      .json({ appointmentDetails, message: "Data successfully fetched" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("Token");
  return res.status(200).json({ message: "Succefully Logged out" });
};
