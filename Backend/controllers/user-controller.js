import User from "../model/User.js";
import Address from "../model/addressModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { OAuth2Client } from "google-auth-library";
const accountSid = "AC335fa87eb66f78223c2a1240cedc0a3b";
const authToken = "9fbb34f58d1aaa1a9014fb18bfe531f4";
const servicessid = "VAf5818e4f455d71516d14c6b86c1b67ed";
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
      // const otpResponse = "1234";
      const otpResponse = await client.verify.v2
        .services(servicessid)
        .verifications.create({ to: `+91${phonenumber}`, channel: "sms" });
      console.log(otpResponse);
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

export const googleSignup = async (req, res) => {
  const { credential, clientId, userType } = req.body;
  console.log("credential", credential);
  console.log("clientId", clientId);
  console.log("userType", userType);
  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      const user = new User({
        username: payload?.name,
        email: payload?.email,
        userType,
      });
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const expirationTime = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("Token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: expirationTime,
      });
      return res
        .status(200)
        .json({ message: "Successfully Logged In", token, user, userType });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const expirationTime = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("Token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: expirationTime,
      });
      return res
        .status(200)
        .json({ message: "Successfully Logged In", token, user });
    }
  } catch (error) {
    console.error("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const verifyotp = async (req, res, next) => {
  const { otp, phonenumber } = req.body;

  try {
    // const verifiedResponse = {};
    // verifiedResponse.status = otp === "1234" ? "approved" : "";
    const verifiedResponse = await client.verify.v2
      .services(servicessid)
      .verificationChecks.create({
        to: `+91${phonenumber}`,
        code: otp,
      });
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

    console.log("UserData", user);
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
    return res.status(200).json({ message: "Profile Updated Successfully" });
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
    await User.updateOne(
      { _id: userid },
      { $push: { addressDetails: address._id } }
    );
    console.log("addressData", address);
    return res.status(201).json({ message: "Address added successfully" });
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

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the address" });
  }
};

export const logout = async (req, res) => {
  // const token = req.headers.cookie;
  // console.log("token",token)
  // console.log("logout");
  res.clearCookie("Token");
  return res.status(200).json({ message: "Succefully Logged out" });
};
