const express = require('express');
const router = express.Router();
const User = require('../models/userModel');



const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/public/userImages/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});



router.route('/signup').post((req, res) => {

    const dateCreated = new Date();

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        memberSince: dateCreated,
    })

    newUser.save();
});

router.route('/login').post((req, res) => {

    const url = req.protocol + '://' + req.get('host')
    console.log(url)

    const usernameEmail = req.body.usernameEmail;
    const password = req.body.password;


    User.findOne({username: usernameEmail}, (err, foundUser) => {
        if(err) {
            console.log(err);
        } else {
            if(foundUser) {
                if(foundUser.password === password){
                    console.log(foundUser);
                    return res.send({
                        success: true,
                        status: "successful",
                        user: foundUser,
                    })
                }
                else {
                    return res.send({
                        success: false,
                        status: "incorrect password"
                    })
                }
            }
            else {
                return res.send({
                    success: false,
                    status: "user not found"
                })
            }
        }
    })
})


module.exports = router;