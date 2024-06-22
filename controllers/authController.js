const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const productModel = require('../models/product-model');

module.exports.registerUser = async (req, res) => {
    try {
        let {email, fullname, password} = req.body;

    if (!email || !fullname || !password) {
        return res.status(400).send('All fields are required');
    }

    const userExists = await userModel.findOne({email})
    if (userExists) {
        return res.status(400).send('User already exists, please login');
    }
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).send(err.message);
            }else {
                const user = await userModel.create({
                    email,
                    fullname,
                    password: hash
                });
                const token = generateToken(user);
                res.cookie("token", token)
                res.status(201).send(user);
            }
        })
    })
    
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            req.flash('error', 'Please login to access this page');
            return res.redirect('/');
        }
        const user = await userModel.findOne({email})

        if (!user) {
            
            req.flash('error', 'User does not exist, please register');
            return res.redirect('/');
        }
        bcrypt.compare(password,user.password, async(err,result)=>{
            if(result){
                const products = await productModel.find();
                const token = generateToken(user);
                res.cookie("token", token)
                res.render("shop", {products})
            } else {
                req.flash('error', 'Email or password incorrect');
                return res.redirect('/');
            }
        })

    } catch (error) {
        res.status(404).send(error.message);
    }
}
module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie('token', '');
        req.flash('error', 'User logged out successfully');
        return res.redirect('/');
    } catch (error) {
        req.flash('error', 'An error occurred');
        return res.redirect('/');
    }
}