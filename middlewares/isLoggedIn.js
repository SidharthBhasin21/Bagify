const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");


module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('Error', 'Please login to access this page');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select('-password');

        req.user = user;
        next();
    } catch (error) {
        req.flash('Error', 'Please login to access this page');
        return res.redirect('/');
    }

}