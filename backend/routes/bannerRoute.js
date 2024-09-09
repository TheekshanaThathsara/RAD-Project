import express from "express";
import multer from "multer";
import { addBanner, listBanners, removeBanner, updateBanner } from "../controllers/bannerController.js";

const bannerRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Banner Routes
bannerRouter.post("/add", upload.single("image"), addBanner);
bannerRouter.get("/list", listBanners);
bannerRouter.delete("/remove/:id", removeBanner);
bannerRouter.post("/update/:id",upload.single("image"),  updateBanner);

export default bannerRouter;
