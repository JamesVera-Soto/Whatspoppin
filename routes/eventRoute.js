const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/userModel')
//const upload = require('../middleware/upload');



const multer = require('multer');
const { append } = require('vary');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/public/eventImages/');
    },
    filename: (req, file, cb) => {
        try {
            var filename = file.originalname.replace(/[^a-zA-Z0-9-_\.]/g, '_');
            cb(null, filename)
        } catch {
            console.log("No file")
        }
    }
})

const upload = multer({storage: storage});




router.post('/create-event', upload.any('imgs'), (req, res) => {

    const url = req.protocol + '://' + req.get('host')

    var imgArr = []
    for(var img of req.files){
        var filename = img.originalname.replace(/[^a-zA-Z0-9-_\.]/g, '_');
        imgArr.push(filename)
    }
    
    const newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        startDatetime: req.body.startDatetime,
        endDatetime: req.body.endDatetime,
        imgs: imgArr,
        organizer: req.body.organizer,
    })

    newEvent.save(async(err, event) => {
        console.log("EVENT: ",event)
        await User.findByIdAndUpdate(req.body.organizerId, {$push: {userEvents: event._id}})
    })
});

router.route('/events').get((req,res) => {
    Event.find().then(foundEvents => res.json(foundEvents));
});

router.route('/account/my-events/:id').get((req,res) => {
    console.log("params",req.params)
    Event.find({organizer: req.params.id}).then(foundEvents => res.json(foundEvents));
});

router.route('/account/my-events/delete').post((req, res) => {
    Event.findByIdAndDelete(req.body.id, (err, docs) => {
        if(err){
            console.log(err)
        }
        else {
            console.log("Deleted: ", docs)
            res.status(200).send()
        }
    })
})

module.exports = router;