const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const bcrypt = require('bcrypt')

const multer = require('multer');

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/public/userImages/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});



router.route('/signup').post(async (req, res) => {

    if(await User.findOne({username: req.body.username})){
        res.send({success: false, hint: "username already exists"})
    }
    else if(await User.findOne({email: req.body.email})){
        res.send({success: false, hint: "email already in use"})
    }
    else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const dateCreated = new Date();

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                memberSince: dateCreated,
            })

            newUser.save();
            res.status(201).send()
        } 
        catch {
            res.status(500).send()
        }
    }
});

router.route('/login').post(async (req, res) => {

    const field = validateEmail(req.body.usernameEmail) ? "email" : "username"

    User.findOne({[field]: req.body.usernameEmail}, async (err, foundUser) => {
        try {
            if(err) {
                console.log(err);
            } else {
                if(foundUser) {
                    if(await bcrypt.compare(req.body.password, foundUser.password)){
                        console.log(foundUser);
                        return res.send({
                            success: true,
                            hint: "successful",
                            user: foundUser,
                        })
                    }
                    else {
                        return res.send({
                            success: false,
                            hint: "incorrect password"
                        })
                    }
                }
                else {
                    return res.send({
                        success: false,
                        hint: "user not found"
                    })
                }
            }
        }
        catch {
            res.status(500).send()
        }
        
    })
})


module.exports = router;