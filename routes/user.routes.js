const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user.model');
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
            const payload = {user: {id: user.id}};

            jwt.sign(payload, "randomString", {expiresIn: 3600},
            (err, token) => {
                if(err) throw err;
                res.status(200).json({token});
            });   
        } catch(err){
            console.log(err.message);
            res.status(500).send("Error saving this object");
        }
    }
);
//Logging in a User
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
            const payload = {user: {id: user.id}};
            jwt.sign(payload, "secret", {expiresIn: 3600},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({token});
            });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({message: "server error"});
        }
    }
);

router.get("/userInfo", authorization, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        res.json(user);
    }
    catch (e) {
        res.send({ message: "An error occurred when fetching the user info"});
    }
});

module.exports = router;