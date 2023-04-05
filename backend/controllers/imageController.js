import Image from "../models/imageModel.js";
import sharp from "sharp";

async function uploadImage(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    // create and save all three versions of the image
    const originalImage = new Image({
      original: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
    const mediumImage = await sharp(file.buffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();
    originalImage.medium = {
      data: mediumImage,
      contentType: file.mimetype,
    };
    const lowImage = await sharp(file.buffer)
      .resize(400)
      .jpeg({ quality: 50 })
      .toBuffer();
    originalImage.low = {
      data: lowImage,
      contentType: file.mimetype,
    };
    await originalImage.save();

    // return URL for the original image
    const imageUrl = "/api/images/get/" + originalImage._id;
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function getImage(req, res) {
  try {
    const imageType = req.params.type;//this detemine the image size to be returned [original,medium,low]
    const image = await Image.findById(req.params.id).select(imageType);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.set('Content-Type', image.contentType);
    res.send(image[imageType].data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export {uploadImage,getImage}
