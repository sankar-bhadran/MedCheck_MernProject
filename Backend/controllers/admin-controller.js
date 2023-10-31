import User from "../model/User.js";
import Category from "../model/categoryModel.js";
import Location from "../model/locationModel.js";
import LabCategory from "../model/labcategoryModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import centerdetails from "../model/centerdetails.js";
import Appointments from "../model/appointmentModel.js";
import labDetails from "../model/labdetails.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import appointmentModel from "../model/appointmentModel.js";
export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  let admin;
  console.log(email, password);
  try {
    admin = await User.findOne({ email: email });
    console.log("hai");
    console.log(admin);
    if (!admin.is_admin === 1) {
      return res.status(400).json({ message: "User not found Signup please" });
    }
    const hashedpassword = bcrypt.compareSync(password, admin.password);
    if (!hashedpassword) {
      return res.status(400).json({ message: "Invalid email and password" });
    }
    console.log("bye");

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const expirationTime = new Date(Date.now() + 1000 * 60 * 60);
    res.cookie("AdminToken", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: expirationTime,
    });

    return res
      .status(200)
      .json({ message: "Successfully LoggedIn", token, admin });
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategory = async (req, res) => {
  const { TestName, subCategory } = req.body;
  // let categoryData;
  try {
    const categoryData = await Category.findOne({ Testname: TestName });
    if (categoryData) {
      return res.status(400).json({ message: "Category already Exists" });
    }
    const category = new Category({
      Testname: TestName,
      sub: { name: subCategory },
    });
    await category.save();
    return res.status(200).json({ message: "Category Added", category });
  } catch (error) {
    console.log(error.message);
  }
};

export const viewCategory = async (req, res) => {
  try {
    const categoryData = await Category.find();
    return res.status(200).json({ message: "Successfull", categoryData });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSub = async (req, res) => {
  const { categoryid } = req.params;
  console.log("categoryId", categoryid);
  try {
    const categoryData = await Category.findById({ _id: categoryid });
    return res.status(200).json({ message: "Successfull", categoryData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const userList = async (req, res) => {
  console.log("sdkfjsdkfnksdflksdf");
  try {
    const userData = await User.find({ userType: "user" });
    return res.status(200).json({ message: "Successful", userData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const userAccess = async (req, res) => {
  const { userData } = req.body;
  console.log("req.body", req.body);
  try {
    const user = await User.findById(userData);
    const access = await User.updateOne(
      { _id: userData },
      { $set: { is_blocked: !user.is_blocked } }
    );
    if (!access) {
      return res
        .status(404)
        .json({ message: "User not found or something went wrong!" });
    }
    return res.status(200).json({ message: " updated successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const ownerList = async (req, res) => {
  console.log("djdfbjsdb");
  try {
    const ownersData = await User.find({ userType: "recruiter" });
    return res.status(200).json({ message: "Successful", ownersData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const ownerAccess = async (req, res) => {
  const { ownerData } = req.body;
  console.log("req.body", req.body);
  try {
    const owner = await User.findById(ownerData);
    console.log(owner);
    const access = await User.updateOne(
      { _id: ownerData },
      { $set: { is_blocked: !owner.is_blocked } }
    );
    if (!access) {
      return res
        .status(404)
        .json({ message: "User not found or something went wrong!" });
    }
    return res.status(200).json({ message: " updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getCenterDetails = async (req, res) => {
  const { centerid } = req.params;
  console.log("centerid", centerid);
  try {
    const centerDetails = await centerdetails
      .findById(centerid)
      .populate("owner");
    console.log("centerDetails", centerDetails);
    if (!centerDetails) {
      return res.status(404).json({ message: "Center not found" });
    }
    return res
      .status(200)
      .json({ centerDetails, message: "Data fetched successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const availableCategory = async (req, res) => {
  const { isAvailable } = req.body;
  let categoryId = isAvailable;
  try {
    const category = await Category.findById(categoryId);
    if (category.is_available) {
      await Category.findByIdAndUpdate(
        { _id: categoryId },
        { $set: { is_available: 0 } }
      );
    } else {
      await Category.findByIdAndUpdate(
        { _id: categoryId },
        { $set: { is_available: 1 } }
      );
    }
    return res
      .status(200)
      .json({ message: "Successfully updated availability" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const approval = async (req, res) => {
  const { data } = req.body;
  console.log("req.body", req.body);
  try {
    const centerdetail = await centerdetails
      .findById({ _id: data })
      .populate("owner");
    console.log("email", centerdetail.owner.email);
    if (!centerdetail) {
      return res.status(404).json({ message: "Center not found" });
    }
    centerdetail.isVerified = true;
    await centerdetail.save();
    if (centerdetail.isVerified) {
      let currentDate = new Date();
      let formattedDate = currentDate.toDateString();
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
          name: `${centerdetail.owner.username}`,
          intro: [
            `We are delighted to inform you that your registration has been approved on ${formattedDate}. Welcome to MedCheckin, and thank you for choosing to be a part of our community.`,
          ],
          outro: [
            "Need help, or have questions?",
            "Just reply to this email, we'd love to help.",
          ],
        },
      };

      let mail = MailGenerator.generate(response);

      let mailOptions = {
        from: '"Medcheckin" <brocamptvm@gmail.com>',
        to: centerdetail.owner.email,
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
    }
    return res
      .status(200)
      .json({ message: "Approved successfully", centerdetail });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const centerreject = async (req, res) => {
  const { rejectreason, id } = req.body;
  console.log("req.body", rejectreason);
  try {
    await centerdetails.findOneAndUpdate(
      { _id: id },
      { $set: { reject: true, rejectMessage: rejectreason } }
    );

    const details = await centerdetails.findById({ _id: id }).populate("owner");
    console.log("dsfsfsdkajhaskdjh", details);
    console.log("message", details.rejectMessage);
    if (details.reject) {
      let currentDate = new Date();
      let formattedDate = currentDate.toDateString();
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
          name: `${details.owner.username}`,
          intro: [
            `We appreciate your interest in joining MedCheckin. After careful consideration, we regret to inform you that your registration, which was scheduled for ${formattedDate}, has been declined due to ${details.rejectMessage}`,
          ],
          outro: [
            "Need help, or have questions?",
            "Just reply to this email, we'd love to help.",
          ],
        },
      };

      let mail = MailGenerator.generate(response);

      let mailOptions = {
        from: '"Medcheckin" <brocamptvm@gmail.com>',
        to: details.owner.email,
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
    }
    return res.status(200).json({ message: "Reject successfully", details });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addLocation = async (req, res) => {
  try {
    const { PlaceName } = req.body;
    console.log("placename", PlaceName);
    await Location.updateOne(
      { _id: "651cfa3872cf55ab95b6a82f" },
      { $push: { location: PlaceName } }
    );
    const addedLocation = await Location.find();
    console.log("addedLoction", addedLocation);
    return res.status(200).json({ message: "location stored", addedLocation });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const fetchallLocation = async (req, res) => {
  try {
    const allLocationDetails = await Location.find();
    return res.status(200).json({
      message: "locations data fetch successfuly",
      allLocationDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const scanPendingList = async (req, res) => {
  try {
    const pendingList = await centerdetails.find({ isVerified: false });
    return res
      .status(200)
      .json({ pendingList, message: "data fetch successfuly" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const addLabCategory = async (req, res) => {
  const { TestName } = req.body;
  console.log("labcategoryname", TestName);
  try {
    const labCategoryData = await LabCategory.findOne({ Testname: TestName });
    if (labCategoryData) {
      return res.status(400).json({ message: "Category already Exists" });
    }
    const labCategory = new LabCategory({
      Testname: TestName,
    });
    await labCategory.save();
    return res.status(200).json({ message: "Category Added", labCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const viewLabCategory = async (req, res) => {
  try {
    const labcategorydata = await LabCategory.find();
    return res
      .status(200)
      .json({ message: "successful fetch", labcategorydata });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const adminDashboard = async (req, res) => {
  let todayLabsum = 0;
  let todayScanSum = 0;
  try {
    const scanCenterCount = await centerdetails.countDocuments({
      isVerified: true,
    });
    const labCenterCount = await labDetails.countDocuments({
      isVerified: true,
    });
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const type = await Appointments.find({
      type: "LabCentre",
      bookedDate: formattedDate,
    });
    const prices = type.map(
      (appointment) => appointment.testDetails.totalPrice
    );
    todayLabsum = prices.reduce((acc, price) => acc + price, 0);

    const Scantype = await Appointments.find({
      type: "ScanCentre",
      bookedDate: formattedDate,
    });
    console.log("ScanType", Scantype);
    const Scanprices = Scantype.map(
      (appointment) => appointment.testDetails.totalPrice
    );
    todayScanSum = Scanprices.reduce((acc, price) => acc + price, 0);
    const scanBooking = await appointmentModel.countDocuments({ type: "ScanCentre" });
    console.log("Scan",scanBooking)

    const dashboarddata = {
      scanCenterCount: scanCenterCount,
      labCenterCount: labCenterCount,
      labSum: todayLabsum,
      scanSum: todayScanSum,
    };
    return res
      .status(200)
      .json({ message: "successful fetch", dashboardData: dashboarddata });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const logout = async (req, res) => {
  console.log("logout");
  res.clearCookie("AdminToken");
  return res.status(200).json({ message: "Succefully Logged out" });
};
