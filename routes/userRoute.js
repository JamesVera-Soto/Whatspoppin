const express = require('express');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const router = express.Router();
const User = require('../models/userModel');

const store = new MongoDBSession({
    uri: process.env.MONGODB_EVENTSDB,
    collection: 'userSessions',
})

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const multer = require('multer');
const { JsonWebTokenError } = require('jsonwebtoken');

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
                userEvents: [],
            })

            newUser.save();
            res.status(201).send()
        } 
        catch {
            res.status(500).send()
        }
    }
});

router.route('/login').get(async (req, res) => {
    if(req.session.user) {
        const user = await User.findById(req.session.user._id)
        res.send({loggedIn: true, user: user})
    } else {
        res.send({loggedIn: false})
    }
})

router.route('/login').post(async (req, res) => {

    const field = validateEmail(req.body.usernameEmail) ? "email" : "username"

    User.findOne({[field]: req.body.usernameEmail}, async (err, foundUser) => {
        try {
            if(err) {
                console.log(err);
            } else {
                if(foundUser) {
                    if(await bcrypt.compare(req.body.password, foundUser.password)){
                        req.session.user = foundUser
                        console.log(req.session)
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

router.route('/organizer/:id').get((req,res) => {
    console.log("params for event", req.params)
    User.findOne({username: req.params.id}, (err, data) => {
        if(!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send({name: "Could not find", success: false})
        }
    })
});

router.route('/api/updateUser').post(async (req, res) => {
    console.log("updating user... req: ", req.body)

    User.findOneAndUpdate(
        {[req.body.findByField]: req.body.findByValue}, 
        {$push: {[req.body.field]: req.body.value}}, 
        {new: true}, 
        (err, doc) => {
            if(err) {
                console.log(err)
            }
            else {
                res.send(doc)
            }
    })
    
})


module.exports = router;