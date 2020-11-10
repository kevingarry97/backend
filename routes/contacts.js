const express = require("express");
const mongoose = require("mongoose");
const { Contact } = require("../models/contact");

const router = express.Router();

router.get("/", async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
});

router.post("/", async (req, res) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        message: req.body.message,
    })

    await contact.save();
    res.status(201).json({
        message: "Message sent",
        contact
    });
})

module.exports = router;