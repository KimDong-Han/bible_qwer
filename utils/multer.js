import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // 허용할 이미지 타입 정의
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: fileFilter,
});
export default upload;
