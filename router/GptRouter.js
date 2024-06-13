// const express = require("express");
import express from "express";
import upload from "../utils/multer.js"; // multer 설정 불러오기

const router = express.Router();
// const cnnectGpt = require("../controller/connectGpt");
import connectAi, { connectAis } from "../controller/connectGpt.js";

// router.post(
//   "/Gpt",
//   upload.fields([
//     { name: "original", maxCount: 1 },
//     { name: "gpt", maxCount: 1 },
//   ]),
//   connectAi
// );

router.post("/Gpt", connectAi);

export default router;
