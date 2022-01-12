const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user.model');
const config = require('../middleware/config.json');
const tokenList = {};
const authorization = require('../middleware/authorization');

//Registering a user
router.post(
    "/signup",
    [
        check("email", "Please enter an email address")
        .not()
        .isEmpty(),
        check("password", "Please enter a valid password")
        .isLength({ min: 4})
    ],
    async (req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const{ email, password } = req.body;
        try{
            let user = await User.findOne({email});
            if (user) {
                return res.status(400).json({message: "Ths email is already taken"});
            }
            user = new User({email, password});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.status(200).send(user);
        } catch(err){
            console.log(err.message);
            res.status(500).send("Error saving this object");
        }
    }
);
//Logging in a 
router.post(
    "/login",
    [
        check("email", "Please enter a valid email address").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 4
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const{email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "User does not exist"});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({message: "Password Incorrect"});
            }
            const token = jwt.sign(user.toObject(), config.accessToken, {expiresIn: config.tokenLife});
            console.log("Access Token success");
            const refreshToken = jwt.sign(user.toObject(), config.refreshToken, {expiresIn: config.refreshTokenLife});
            console.log("Refresh Token success");
            const response = {
                status: "Logged In",
                token: token,
                refreshToken: refreshToken
            };
            tokenList[refreshToken] = response;
            res.status(200).json(response);
        }
        catch (e) {
            console.error(e);
            res.status(500).json({message: "server error"});
        }
    }
);
//Get the specified user's info
router.get("/userInfo/:id", authorization, async (req, res) => {
    try{
        const user = await User.findById({_id: req.params.id});
        res.json(user);
    }
    catch (e) {
        console.log(e);
        res.send({ message: "An error occurred when fetching the user info"});
    }
});
//Update the user information
router.put("/updateUserInfo/:id", authorization, async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, context: 'query'});
        res.json(updatedUser);
    }
    catch (e) {
        console.log(e);
        res.send({message: "Unable to update the user info"});
    }
});
//Delte the user from the database
router.delete("/deleteUser/:id", authorization, async (req, res) => {
    try{
        const deletedUser = await User.deleteOne({_id: req.params.id});
        res.json(deletedUser);
    }
    catch (e) {
        console.log(e);
        res.send({message: "Unable to delete that user."});
    }
})
module.exports = router;