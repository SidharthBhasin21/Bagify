const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV == "development") {
    router.post("/create", async (req, res) => {
        const {fullname,email,password} = req.body;
        const isUser = await ownerModel.find();
        if (isUser.length > 0) return res.status(503).send("Owner limit reached", isUser);
        const createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });
        res.status(201).send(createdOwner);
    });
    router.get("/delete", async (req, res) => {
        const deletedOwner = await ownerModel.deleteMany();
        res.status(200).send(deletedOwner);
    })


}

router.get("/", (req, res) => {
  res.send("Owner Router");
});

module.exports = router;
