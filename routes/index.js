const express = require('express');
const productModel = require('../models/product-model');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    let error = req.flash('error');
    if(error.length > 0){
        return res.render('index', {error});
    }
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            if(decoded.email){
                const products = await productModel.find();
                return res.render('shop',{products});
            } else {
                return res.render('index');
            }
        } catch (error) {
            return res.send( error.message);
        }

}})
router.get('/shop', async (req, res) => {
    let products = await productModel.find();
    res.render('shop', {products});
})

module.exports = router;