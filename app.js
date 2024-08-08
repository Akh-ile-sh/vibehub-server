const express = require("express");
const { connectDb } = require("./DB/connect.js");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { register } = require("./controller/authController.js");
const { createPost } = require("./controller/postController.js");
const { verifyToken } = require("./middleware/auth.js");

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes with files or where image will be uploaded
app.post("/api/v1/auth/register", upload.single("picture"), register);
app.post(
  "/api/v1/post/createPost",
  verifyToken,
  upload.single("picture"),
  createPost
);

// Routes
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoute.js");

// APIs
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

const port = process.env.PORT || 3000;

const start = async function () {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log("connected to the database");
    app.listen(port, function () {
      console.log(`server is listening to port ${port}...!!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
