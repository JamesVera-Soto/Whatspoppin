const express = require('express');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const router = express.Router();
const User = require('../models/userModel');
const Event = require('../models/eventModel')

const store = new MongoDBSession({
    uri: process.env.MONGODB_EVENTSDB,
    collection: 'userSessions',
})

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const multer = require('multer');
const { JsonWebTokenError } = require('jsonwebtoken');
const { events } = require('../models/userModel');

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
                avatar: 'person-placeholder.png',
            })

            newUser.save();
            res.status(201).send()
        } 
        catch {
            res.status(500).send()
        }
    }
});

router.route('/api/login').get(async (req, res) => {
    if(req.session.user) {
        const user = await User.findById(req.session.user._id)
        res.send({loggedIn: true, user: user})
    } else {
        res.send({loggedIn: false})
    }
})

router.route('/api/basicUserInfo/').get(async (req, res) => {
    console.log("params for event", req.query.usernames)
    var p = req.query.usernames
    var users = []
    for(var i = 0, str = ''; i < p.length; i++){
        if(p[i] !== ',') {
            str += p[i]
            if(i === p.length - 1) users.push(str)
        }
        else {
            users.push(str)
            str = ''
        }
    }
    console.log(users)

    User.find({username: { $in: users }}, (err, data) => {
        if(!err) {
            
            console.log(data)
        } else {
            console.log(err)
            res.send({name: "Could not find", success: false})
        }
    })
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

router.route('/api/organizer/:id').get((req,res) => {
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

    var {findByField, findByValue, field, action, value} = req.body
    if(field === "password") value = await bcrypt.hash(value, 10)

    User.findOneAndUpdate(
        {[findByField]: findByValue}, 
        {[action]: {[field]: value}}, 
        {new: true}, 
        (err, doc) => {
            if(err) {
                console.log(err)
            }
            else {
                res.send("Updated successfully!")
            }
    })
    
})

router.route('/api/deleteAccount').post(async (req, res) => {
    console.log("deleting user: ", req.body)

    const user = await User.findById(req.body.id)

    console.log(user)

    const {followers, following, userEvents} = user

    console.log(followers, following, userEvents)

    // update those followers
    followers.map(followerName => {
        console.log("updating follower: ",followerName)
        User.findOneAndUpdate(
            {username: followerName}, 
            {$pull: {following: user.username}},
            (err, doc) => {
                if(err) {
                    console.log(err)
                }
            }
        )
    })

    // update those following
    following.map(followName => {
        console.log("updating follow: ",followName)
        User.findOneAndUpdate(
            {username: followName},
            {$pull: {followers: user.username}},
            (err, doc) => {
                if(err) {
                    console.log(err)
                }
            }
        )
    })

    // delete events
    userEvents.map(event => {
        console.log("deleting event: ",event)
        Event.findByIdAndDelete(event, (err, doc) => {
            if(err){
                console.log(err)
            }
        })
    })

    // delete user
    User.findByIdAndDelete(req.body.id, (err, doc) => {
        if(err) {
            console.log(err)
        }
    })

    req.session.destroy((err) => {
        if(err) throw err;
        res.send('success')
    })
})


module.exports = router;