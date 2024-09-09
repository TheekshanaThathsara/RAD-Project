import fs from "fs";
import bannerModel from "../models/bannerModel.js";

// Add banner
const addBanner = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const banner = new bannerModel({
    title: req.body.title,
    subtitle: req.body.subtitle,
    link: req.body.link,
    image: image_filename,
  });

  try {
    await banner.save();
    res.json({ success: true, message: "Banner Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding banner" });
  }
};

// update banner
const updateBanner = async (req, res) => {
  const id = req.params.id;
  const {title,subtitle,link} = req.body;
  // let image_filename = `${req.file.filename}`;
  console.log("updating banner...");

  // try {
  //     const banner = await bannerModel.findById(req.params.id);

  //     const banner = new bannerModel({
  //         banner.title = req.body.title || banner.title;
  //         banner.subtitle = req.body.subtitle || banner.subtitle;
  //         banner.link = req.body.link || banner.link;
  //     });

  //     await banner.save();
  
  try {
    const banner = await bannerModel.findById(id);
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner Not Found!" });
      return;
    }
    await banner.updateOne({
        title,
        subtitle,
        link
    })
    res.json({ success: true, message: "Banner Saved" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Banner Not Saved" });
  }

  // }
};

// List all banners
const listBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find({});
    res.json({ success: true, data: banners });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching banners" });
  }
};

// Remove banner
const removeBanner = async (req, res) => {
  try {
    const banner = await bannerModel.findById(req.params.id);

    if (banner.image) {
      fs.unlink(`uploads/${banner.image}`, () => {});
    }

    await bannerModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Banner Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing banner" });
  }
};

export { addBanner, listBanners, removeBanner, updateBanner };
