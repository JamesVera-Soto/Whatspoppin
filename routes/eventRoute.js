const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
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

    console.log(req)

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
        imgs: imgArr
    })

    newEvent.save();
});

router.route('/events').get((req,res) => {
    Event.find().then(foundEvents => res.json(foundEvents));
});

module.exports = router;