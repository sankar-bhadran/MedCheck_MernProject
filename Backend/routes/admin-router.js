import express from "express";
import {
  addCategory,
  addLabCategory,
  addLocation,
  adminDashboard,
  adminlogin,
  approval,
  availableCategory,
  centerreject,
  fetchallLocation,
  getCenterDetails,
  getSub,
  logout,
  ownerAccess,
  ownerList,
  scanPendingList,
  userAccess,
  userList,
  viewCategory,
  viewLabCategory,
} from "../controllers/admin-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const adminRouter = express.Router();
adminRouter.post("/adminlogin", adminlogin);
adminRouter.post(
  "/admincategories",
  verifyToken,
  upload.single("file"),
  addCategory
);
adminRouter.get("/admincategories", verifyToken, viewCategory);
adminRouter.patch("/admincategories", verifyToken, availableCategory);
adminRouter.get("/userdetails", verifyToken, userList);
adminRouter.patch("/blockuser", verifyToken, userAccess);
adminRouter.get("/getowner", verifyToken, ownerList);
adminRouter.patch("/blockowner", verifyToken, ownerAccess);
adminRouter.get("/viewdetails/:centerid", verifyToken, getCenterDetails);
adminRouter.get("/getCategory/:categoryid", verifyToken, getSub);
adminRouter.patch("/centerapprove", verifyToken, approval);
adminRouter.patch("/centerreject", verifyToken, centerreject);
adminRouter.post('/addloaction',verifyToken,addLocation)
adminRouter.get('/fetchalllocation',verifyToken,fetchallLocation)
adminRouter.get('/scanpendinglist',verifyToken,scanPendingList)
adminRouter.post('/labaddcategory',verifyToken,addLabCategory)
adminRouter.get('/labcategorydata',verifyToken,viewLabCategory)
adminRouter.get('/dashboarddata',verifyToken,adminDashboard)
adminRouter.get("/adminpanel", verifyToken, logout);

export default adminRouter;
