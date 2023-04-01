import mongoose from "mongoose";
import Image from "../models/imageModel.js";

async function uploadImage(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Please upload a file" });
        }
        const newImage = new Image({
            data: file.buffer,
            contentType: file.mimetype,
        });
        await newImage.save();
        const imageUrl = "/api/images/get/" + newImage._id;
        res.json({ url: imageUrl });
}

async function getImage(req, res) {
  const image = await Image.findById(req.params.id);
  if (!image) {
    return res.status(404).json({ error: 'Image not found' });
  }
  res.set('Content-Type', image.contentType);
  res.send(image.data);
}
export {uploadImage,getImage}
