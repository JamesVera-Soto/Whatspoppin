const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/userModel')
//const upload = require('../middleware/upload');
const path = require('path')



const multer = require('multer');
const { append } = require('vary');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/build/eventImages');
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
        if(err) {
            res.send({"success": false, "hint": err.message})
        }
        else{
            await User.findByIdAndUpdate(req.body.organizerId, {$push: {userEvents: event._id}})
            res.status(201).send()
        }
    })    

    
});

router.post('/api/update-event', upload.any('addedImgs'), (req, res) => {

    var imgArr = req.body.imgs
    for(var img of req.files){
        var filename = img.originalname.replace(/[^a-zA-Z0-9-_\.]/g, '_');
        imgArr.push(filename)
    }
    
    const updatedEvent = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        startDatetime: req.body.startDatetime,
        endDatetime: req.body.endDatetime,
        imgs: imgArr,
        organizer: req.body.organizer,
    }

    console.log(updatedEvent)

    Event.findByIdAndUpdate(req.body.eventId, updatedEvent, async(err, event) => {
        if(err) {
            res.send({"success": false, "hint": err.message})
        }
        else{
            res.status(201).send()
        }
    })

});

router.route('/api/events').get((req,res) => {
    Event.find().then(foundEvents => res.json(foundEvents));
});

router.route('/api/event/:id').get((req,res) => {
    console.log("params for event", req.params)
    Event.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send({name: "Could not find", success: false})
        }
    })
});

router.route('/api/account/my-events/:userId').get(async(req,res) => {
    console.log("params",req.params)
    const user = await User.findById(req.params.userId)
    
    Event.find({_id: {$in: user.userEvents}}).then(foundEvents => res.json(foundEvents));
});

router.route('/account/my-events/delete').post((req, res) => {
    Event.findByIdAndDelete(req.body.id, (err, docs) => {
        if(err){
            console.log(err)
        }
        else {
            console.log("Deleted: ", docs)
            User.findOneAndUpdate({username: docs.organizer}, {$pull: {userEvents: docs._id}}, (err, docs) => {
                if(err){
                    console.log(err)
                } else {
                    console.log("doc before update: ", docs)
                }
            })
            res.status(200).send()
        }
    })
})

module.exports = router;