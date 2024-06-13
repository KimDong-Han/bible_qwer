// express 불러오기
// const express = require("express");
import express from "express";
import cors from "cors";
import mongoDB from "mongodb";
import Mongoose from "mongoose";
// express 인스턴스 생성
const app = express();
// 포트 정보
const port = 3001;
// const config = require("config");
import config from "config";

// const connectGpt = require("./router/GptRouter");
import connectGpt from "./router/GptRouter.js";
import qwer from "./router/QwerRouter.js";

const whitelist = ["http://127.0.0.1:5500/index.html"];
const uri = "mongodb+srv://hajiman_test:1q2w3e4r@hajiman.fhonycx.mongodb.net/";

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log(origin, callback);
//       callback(new Error("Not Allowed Origin!"));
//     }
//   },
// };
app.use(
  cors({
    origin: "*",
  })
);
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 라우트 설정
// HTTP GET 방식으로 '/' 경로를 요청하였을 때
// Hello World!라는 문자열을 결과값으로 보냄
qwer;
// app.use("/cgtp", connectGpt);
app.use("/qwer", qwer);

app.get("/", (req, res) => {
  res.send("Hello World!@");
  console.log("?");
});

Mongoose.connect(uri)
  .then(() => {
    console.log("(성공~~~~~~~~~~)Connected to MongoDB");
  })
  .catch((err) => {
    console.error("FㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇB", err);
  });
// 서버 실행
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
