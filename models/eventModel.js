const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    startDatetime: {
        type: String,
        required: true
    },
    endDatetime: {
        type: String,
        required: true
    },
    imgs: {
        type: [String]
    },
    organizer: {
        type: String,
        required: true
    }
})

const Event = mongoose.model("Event", eventsSchema);

module.exports = Event;
