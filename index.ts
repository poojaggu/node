import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const userRouter = require("./routes/authenticationroutes");
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.mongoUrl)
  .then(() => console.log("successs"))
  .catch((err) => console.log(err));
app.use("/users", userRouter);
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log("success");
});
