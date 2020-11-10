const express = require("express");
const upload = require("../multer");
const mongoose = require("mongoose");
const cloudinary = require("../cloudinary");
const { Image } = require("../models/image");
const { Product } = require("../models/product");

const router = express.Router();

router.get('/images/:id', async (req, res) => {
    const image = await Image.findById(req.params.id)
    if(!image) return res.status(404).send(`Can't find the product`);
  
    res.status(200).send(image);
});

router.get("/images", async (req, res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const imageQuery = Image.find();
  
    if (pageSize && currentPage)
      imageQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  
    const image = await imageQuery;
    res.status(200).send(image);
});

router.post("/upload-images", upload.array("files"), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
  
    const urls = [];
    const files = req.files;
  
    const product = await Product.findById(req.body.id);
    if (!product) return res.status(400).send(`Can't Find Product`);
  
    for (const file of files) {
      const { path } = file;
  
      const newPath = await uploader(path);
  
      urls.push(newPath);
    }
  
    let images = new Image({
      image: urls.map((item) => item["url"]),
      product,
    });
  
    images = await images.save();
    res.status(200).send(images);
});

module.exports = router;