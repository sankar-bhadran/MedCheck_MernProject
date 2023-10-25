import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { LabReject, addlabtest, fetchLabDetails, getAddedTest, getLabCategories, getLabTest, getLabsDetails, getOneLabDetail, labApproval, labContinueTrue, lablistingdetails, registerLab } from "../controllers/lab-controller.js";
import { upload } from "../middleware/multer.js";

const labRouter = express.Router();

labRouter.post('/registerlab',verifyToken, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "NABH", maxCount: 1 },
    { name: "NABL", maxCount: 1 },
    { name: "ISO", maxCount: 1 },
  ]),registerLab)
  labRouter.get('/getalllabsdetails',verifyToken,getLabsDetails)
  labRouter.get('/labviewdetails/:centerid',verifyToken,getOneLabDetail)
  labRouter.patch('/labapproval',verifyToken,labApproval)
  labRouter.patch('/labreject',verifyToken,LabReject)
  labRouter.get('/alldetails',verifyToken,fetchLabDetails)
  labRouter.get('/lablistingdetails',verifyToken,lablistingdetails)
  labRouter.patch('/labonetimeapprovel',verifyToken,labContinueTrue)
  labRouter.get('/labcategorires',verifyToken,getLabCategories)
  labRouter.post('/addlabtests',verifyToken,addlabtest)
  labRouter.get('/fetchalladdedtest/:centerid',verifyToken,getAddedTest)
  labRouter.get('/getlabtest',verifyToken,getLabTest)


export default labRouter;
