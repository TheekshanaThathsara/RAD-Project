import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    link: { type: String }, // Optional link field
    image: { type: String, required: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const bannerModel = mongoose.models.banner || mongoose.model("banner", bannerSchema);

export default bannerModel;
