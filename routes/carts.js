const express = require("express");
const Cart = require("../models/cart");
const { Image } = require("../models/image");

const router = express.Router();

router.get("/shopping-cart", async (req, res) => {
    if (!req.session.cart) return res.send(req.session.cart);
  
    let cart = new Cart(req.session.cart);

    res.send({
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
      totalQty: cart.totalQty,
    });
});

router.post("/add-to-cart", async (req, res) => {
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    const image = await Image.findById(req.body.id);
    if (!image) return res.status(404).send("No Product found!!");
  
    cart.add(image, image._id, req.body.size);
    req.session.cart = cart;
    res.send(req.session.cart);
    console.log(req.session.cart);
});

router.get("/reduce-cart/:id", async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceOne(productId);
    req.session.cart = cart;
    res.status(200).send(req.session.cart);
});
  
router.get("/remove-cart/:id", async (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeAll(productId);
    req.session.cart = cart;
    res.status(200).send(req.session.cart);
});

module.exports = router;