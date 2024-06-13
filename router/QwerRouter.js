// const express = require("express");
import express from "express";
import upload from "../utils/multer.js"; // multer 설정 불러오기

const router = express.Router();
// const cnnectGpt = require("../controller/connectGpt");
import getListData, { dataFilter } from "../controller/qwerWeb.js";

router.get("/qwerData", getListData);
router.get("/filter", dataFilter);
export default router;
