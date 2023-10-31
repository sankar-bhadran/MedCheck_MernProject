import centerdetails from "../model/centerdetails.js";
import Category from "../model/categoryModel.js";
import TestModel from "../model/testModel.js";
import testModel from "../model/testModel.js";
import Appointments from "../model/appointmentModel.js";

export const registerScan = async (req, res) => {
  try {
    const { image1, image2, image3, NABH, NABL, ISO } = req.files;
    const { ...data } = req.body;
    const register = new centerdetails({
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

export const getIsSubmitte = async (req, res) => {
  const id = req.user;
  console.log(req.user);
  console.log("id", id);
  try {
    const center = await centerdetails.findOne({ owner: id }).populate("owner");
    console.log("sis", center);
    const dataToSend = {
      isSubmitted: center.isSubmitted,
      isVerified: center.isVerified,
      isreject: center.reject,
      message: center.rejectMessage,
      isContinue: center.isContinue,
      ...center._doc,
    };
    return res.status(200).json({
      dataToSend,
      message: "data fetched successfull..!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getCenters = async (req, res) => {
  try {
    const centers = await centerdetails.find().populate("owner");
    return res
      .status(200)
      .json({ centers, message: "data fetched successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getScanCategories = async (req, res) => {
  try {
    const scanCategories = await Category.find();
    return res
      .status(200)
      .json({ scanCategories, message: "data fetched successfull..!" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const addScan = async (req, res) => {
  const { mainCategory, subCategory, testDetails, price, centerID } = req.body;
  try {
    const testdetails = new TestModel({
      Lab: centerID,
      LabUserId: req.user,
      mainCategory,
      subCategory,
      description: testDetails,
      price,
    });
    await testdetails.save();

    return res
      .status(200)
      .json({ message: "TestAdd Successfully", testdetails });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const continueTrue = async (req, res) => {
  const id = req.user;
  console.log(req.user);
  try {
    const centedetails = await centerdetails.findOneAndUpdate(
      { owner: id },
      { $set: { isContinue: true } }
    );
    console.log("continue ", centedetails);
    return res
      .status(200)
      .json({ message: "TestAdd Successfully", centedetails });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const reapply = async (req, res) => {
  const id = req.user;
  const { image1, image2, image3, NABH, NABL, ISO } = req.files;
  const { ...data } = req.body;
  const { CertificateImages, CenterImages } = req.body;
  const images = CenterImages.split(",");
  try {
    const details = await centerdetails.findOneAndUpdate(
      { owner: id },
      {
        $set: {
          ...data,
          owner: id,
          CenterImages: [
            image1?.[0].filename ?? images[0],
            image2?.[0].filename ?? images[1],
            image3?.[0].filename ?? images[2],
          ],
          CertificateImages: [
            { NABH: NABH?.[0].filename ?? req.body.NABH },
            { NABL: NABL?.[0].filename ?? req.body.NABL },
            { ISO: ISO?.[0].filename ?? req.body.ISO },
          ],
          isVerified: "false",
          reject: "false",
          isContinue: "false",
        },
      }
    );

    return res
      .status(200)
      .json({ details, message: "Registeration successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const listingDetails = async (req, res) => {
  try {
    const centerlisting = await centerdetails.find({ isVerified: true });
    return res
      .status(200)
      .json({ centerlisting, message: "data fetched successfully" });
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
    const count = await centerdetails.countDocuments({ isVerified: true });
    console.log("count", count);
    const skip = (page - 1) * ITEM_PER_PAGE;
    const scanSearch = await centerdetails
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(ITEM_PER_PAGE);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);
    console.log("pageCount", pageCount);
    return res.status(200).json({ scanSearch, pageCount });
  } catch (error) {
    return res.status(400).json({ message: "somthing went wrong" });
  }
};

export const categoryDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const fetchCategory = await TestModel.find({ Lab: id });
    return res
      .status(200)
      .json({ fetchCategory, message: "data fetched successfully" });
  } catch (error) {
    console.error("Error in searchDetails:", error);
  }
};

export const getAddTestDetails = async (req, res) => {
  const id = req.params.centerid;
  try {
    const addedDetails = await TestModel.find({ Lab: id });

    if (addedDetails.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res
      .status(200)
      .json({ addedDetails, message: "data fetched successfully" });
  } catch (error) {
    console.error("Error in searchDetails:", error);
  }
};

export const scanDetails = async (req, res) => {
  const { mainCategory, clickedvalue, labId } = req.body;
  try {
    const details = await testModel.find({
      Lab: labId,
      mainCategory,
      subCategory: clickedvalue,
    });
    return res
      .status(200)
      .json({ details, message: "data fetched successfully" });
  } catch (error) {
    console.error("Error in searchDetails:", error);
  }
};

export const fetchBookingDetails = async (req, res) => {
  const id = req.params.centerid;
  try {
    const appointments = await Appointments.find({ labId: id });
    return res
      .status(200)
      .json({ appointments, message: "data fetched successfully" });
  } catch (error) {
    return res.status(400).json({ message: "somthing went wrong" });
  }
};

export const statusChange = async (req, res) => {
  const id = req.body.centerId;
  const status = req.body.age;
  console.log(status);
  console.log(id);
  console.log(req.body);

  try {
    const updatedAppointment = await Appointments.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    console.log("sdasda", updatedAppointment);
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res
      .status(200)
      .json({ updatedAppointment, message: "Status Changed Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadReport = async (req, res) => {
  try {
    const id = req.body.id;
    console.log("file", req.file);
    console.log(req.body.id);
    const reportUploaded = await Appointments.findByIdAndUpdate(
      id,
      { $set: { report: req.file.filename } },
      { new: true }
    );
   
    if (!reportUploaded) {
      return res.status(404).json({ message: "ReportUploaded not found" });
    }
    return res
      .status(200)
      .json({ reportUploaded, message: "ReportUploaded Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
