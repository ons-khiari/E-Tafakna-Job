const express = require("express");
const multer = require("multer");
const adminApp = require("./Firebase");
const router = express.Router();
const storage = adminApp.storage();
const bucket = storage.bucket();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadimage", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).send("No image file provided");
    }
    const file = bucket.file(image.originalname);
    await file.save(image.buffer);
    const downloadURL = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    console.log("File uploaded successfully:", downloadURL);
    res.json({ downloadURL });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
