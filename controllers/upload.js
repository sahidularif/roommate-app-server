const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();       //comes with express
const {Product} = require("../models/product")
const mongoose = require("mongoose");
const multer = require("multer");

//MIME TYPE LOOKUP
const FILE_TYPE_MAP = {
    "image/png" : "png",
    "image/jpeg" : "jpeg",
    "image/jpg" : "jpg"
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(" ").join("_");
      cb(null, fileName + "-" + Date.now())
    }
  })
  
  const uploadOptions = multer({ storage: storage })

// /api/v1
router.get(`/`, async (req, res)=>{
    let filter = {};    //an empty object

    if (req.query.categories){
        filter = {category: req.query.categories.split(', ')}    //empty object will have value when params are added
    }

    const productList = await Product.find({ filter })//.select("name image -_id"); //required params

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})

//getting by ID
router.get(`/:id`, async (req, res)=>{
    const product = await Product.findById(req.params.id).populate("category");  //populate displays the category specs
    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
})

router.post(`/`, uploadOptions.single("image"), async (req, res)=>{

    let category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("What the fuck? Invalid category");
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,//"http://localhost:3000/public/upload/image-213213"
        //images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    product1 = await product.save();
    if(!product1)
    return res.status(500).send("The product cannot be created");

    res.send(product1);
})  