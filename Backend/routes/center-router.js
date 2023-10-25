import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  addScan,
  categoryDetails,
  continueTrue,
  fetchBookingDetails,
  getAddTestDetails,
  getCenters,
  getIsSubmitte,
  getScanCategories,
  listingDetails,
  reapply,
  registerScan,
  scanDetails,
  searchDetails,
} from "../controllers/center-controller.js";
import { upload } from "../middleware/multer.js";
const centerRouter = express.Router();

centerRouter.post(
  "/scanregister",
  verifyToken,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "NABH", maxCount: 1 },
    { name: "NABL", maxCount: 1 },
    { name: "ISO", maxCount: 1 },
  ]),
  registerScan
);
centerRouter.get("/getCenterDetails", verifyToken, getCenters);
centerRouter.get("/scanregister", verifyToken, getIsSubmitte);
centerRouter.get("/scancategories", verifyToken, getScanCategories);
centerRouter.patch("/onetimeapprovel", verifyToken, continueTrue);
centerRouter.post("/addScan", verifyToken, addScan);
centerRouter.patch(
  "/reapply",
  verifyToken,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "NABH", maxCount: 1 },
    { name: "NABL", maxCount: 1 },
    { name: "ISO", maxCount: 1 },
  ]),
  reapply
);
centerRouter.get("/listingdetails", verifyToken, listingDetails);
centerRouter.get("/search", verifyToken, searchDetails);
centerRouter.get('/fetchtestdetails/:id',verifyToken,categoryDetails)
centerRouter.get('/fetchaddtest/:centerid',verifyToken,getAddTestDetails)
centerRouter.post('/getTestDetails',verifyToken,scanDetails)
centerRouter.get('/fetchbookings/:centerid',verifyToken,fetchBookingDetails)
export default centerRouter;
