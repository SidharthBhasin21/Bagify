const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
    res.send("Products Router");
});
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgColor, panelColor, textColor } = req.body;
        const product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgColor,
            panelColor,
            textColor,
        });
        req.flash("success", "Product created successfully");
        res.redirect('/owners/admin')
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
