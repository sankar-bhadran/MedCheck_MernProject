import labdetails from "../model/labdetails.js";
import labcategory from "../model/labcategoryModel.js";
import labTestModel from "../model/labtestModel.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const registerLab = async (req, res) => {
  try {
    const { image1, image2, image3, NABH, NABL, ISO } = req.files;
    const { ...data } = req.body;
    const register = new labdetails({
      ...data,
      owner: req.user,
      isSubmitted: "true",
      CenterImages: [
        image1[0].filename,
        image2[0].filename,
        image3[0].filename,
      ],

      CertificateImages: [
        { NABH: NABH[0].filename },
        { NABL: NABL[0].filename },
        { ISO: ISO[0].filename },
      ],
    });
    await register.save();
    return res
      .status(200)
      .json({ register, message: "Registeration successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getLabsDetails = async (req, res) => {
  try {
    const labsCenters = await labdetails.find().populate("owner");
    return res
      .status(200)
      .json({ labsCenters, message: "data fetched successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getOneLabDetail = async (req, res) => {
  const { centerid } = req.params;
  try {
    const labDetails = await labdetails.findById(centerid).populate("owner");
    if (!labDetails) {
      return res.status(404).json({ message: "center not found" });
    }

    return res
      .status(200)
      .json({ labDetails, message: "Data fetched successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const labApproval = async (req, res) => {
  const { data } = req.body;
  try {
    const labDetails = await labdetails
      .findById({ _id: data })
      .populate("owner");
    console.log("email", labDetails.owner.email);

    if (!labDetails) {
      return res.status(404).json({ message: "Lab not found" });
    }
    labDetails.isVerified = true;
    await labDetails.save();
    if (labDetails.isVerified) {
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
          name: `${labDetails.owner.username}`,
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
        to: labDetails.owner.email,
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
      .json({ message: "Approved successfully", labDetails });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LabReject = async (req, res) => {
  const { rejectreason, id } = req.body;
  try {
    await labdetails.findOneAndUpdate(
      { _id: id },
      { $set: { reject: true, rejectMessage: rejectreason } }
    );
    const details = await labdetails.findById({ _id: id }).populate("owner");
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

export const fetchLabDetails = async (req, res) => {
  const id = req.user;
  try {
    const labCenter = await labdetails.findOne({ owner: id }).populate("owner");
    const sendData = {
      isSubmitted: labCenter.isSubmitted,
      isVerified: labCenter.isVerified,
      isreject: labCenter.reject,
      message: labCenter.rejectMessage,
      isContinue: labCenter.isContinue,
      ...labCenter._doc,
    };
    return res.status(200).json({
      sendData,
      message: "data fetched successfull..!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const lablistingdetails = async (req, res) => {
  try {
    const lablisting = await labdetails.find({ isVerified: true });
    return res
      .status(200)
      .json({ lablisting, message: "data fetched successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const labContinueTrue = async (req, res) => {
  const id = req.user;

  try {
    const Labdetails = await labdetails.findOneAndUpdate(
      { owner: id },
      { $set: { isContinue: true } }
    );
    return res
      .status(200)
      .json({ message: "Continue Successfully", Labdetails });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const getLabCategories = async (req, res) => {
  try {
    const labCategories = await labcategory.find();
    return res
      .status(200)
      .json({ labCategories, message: "data fetched successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const addlabtest = async (req, res) => {
  const { mainCategory, testDetails, price, centerID } = req.body;
  try {
    const addedlabtests = new labTestModel({
      Lab: centerID,
      LabOwnerId: req.user,
      mainCategory,
      description: testDetails,
      price,
    });
    await addedlabtests.save();
    const fetcheddata = await labTestModel.find({ Lab: centerID });
    return res
      .status(200)
      .json({ message: "TestAdded Successfully", fetcheddata });
  } catch (error) {
    return res.status(400).json({ message: "somthing went wrong" });
  }
};

export const getAddedTest = async (req, res) => {
  const id = req.params.centerid;
  console.log("id", id);
  try {
    const fetcheddata = await labTestModel.find({ Lab: id });
    if (fetcheddata.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    return res
      .status(200)
      .json({ fetcheddata, message: "data fetched successfully" });
  } catch (error) {
    console.error("Error in searchDetails:", error);
  }
};

export const getLabTest = async (req, res) => {
  console.log("req.query", req.query);
  console.log("req.query", req.query.category);
  try {
    const fetcheddata = await labTestModel.find({
      mainCategory: req.query.category,
      Lab: req.query.labid,
    });
    console.log("fetchedata",fetcheddata)
    return res
      .status(200)
      .json({ fetcheddata, message: "data fetched successfully" });
  } catch (error) {
    return res.status(400).json({ message: "somthing went wrong" });
  }
};

export const searchDetails = async (req, res) => {
  try {
    console.log(req.query);
    const search = req.query.searchdata;
    const page = req.query.page;
    const location = req.query.location;
    const ITEM_PER_PAGE = 6;
    const query = {
      $or: [
        { CenterName: { $regex: search, $options: "i" } },
        { City: { $regex: search, $options: "i" } },
      ],
    };
    if (location) {
      query.City = location;
    }
    const count = await labdetails.countDocuments({ isVerified: true });
    console.log("count", count);
    const skip = (page - 1) * ITEM_PER_PAGE;
    const labSearch = await labdetails
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(ITEM_PER_PAGE);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);
    console.log("pageCount", pageCount);
    return res.status(200).json({ labSearch, pageCount });
  } catch (error) {
    return res.status(400).json({ message: "somthing went wrong" });
  }
};





