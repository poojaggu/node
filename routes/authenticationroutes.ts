import express from "express";
import {
  createUser,
  loginUser,
  loginValidation,
  validate,
} from "../controllers/authenticationController";

const router = express.Router();

router.post("/add-user", validate, createUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;
