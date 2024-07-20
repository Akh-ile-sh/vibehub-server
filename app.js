import express from "express";
import { connectDb } from "./DB/connect.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controller/authController.js";

//CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//routes with filesor where image will be uploaded
app.post("/api/v1/auth/register", upload.single("picture"), register);

//Routes
import authRoutes from "./routes/authRoutes.js";

// API's
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log("connected to the database");
    app.listen(port, () => {
      console.log(`server is listening to port ${port}...!!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
