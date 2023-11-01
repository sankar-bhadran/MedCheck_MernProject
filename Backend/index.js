import express from "express";
// import dotenv from "dotenv";
import 'dotenv/config';
import cors from "cors";
import userRouter from "./routes/user-router.js";
import connect from "./config/dbconfig.js";
import adminRouter from "./routes/admin-router.js";
import errorHandling from "./middleware/errorHandling.js";
import centerRouter from "./routes/center-router.js";
import labRouter from "./routes/lab-router.js";

// dotenv.config();
const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(cors({ credentials: true, origin: ['https://www.medcheckin.shop',"http://localhost:3000" ]}));
app.use("/api", userRouter);
app.use('/admin',adminRouter)
app.use('/center',centerRouter)
app.use('/labcenter',labRouter)
app.use(errorHandling);

app.get("/", (req, res) => {
  res.json("server started");
});

app.listen(5000, () => {
  connect();
  console.log("Connected to Port 5000");
});
