const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    organizer: {
        type: String
    },
    icon: {
        type: String
    },
    time: {
        type: Date
    },
    new: {
        type: Boolean
    }
})

const usersSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    memberSince : {
        type: Date,
        required: true
    },
    userEvents: {
        type: [String],
        required: true
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    notifications: {
        type: [notificationsSchema]
    }
})

const User = mongoose.model("User", usersSchema);

module.exports = User;