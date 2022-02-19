require('dotenv').config();

const express = require('express');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_EVENTSDB);

app.set('trust proxy', 1) // trust first proxy

const store = new MongoDBSession({
    uri: process.env.MONGODB_EVENTSDB,
    collection: 'userSessions',
})

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use(session({
    key: "user",
    secret: 'key that will sign the cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
    store: store,
}))

app.use('/', require('./routes/eventRoute'));
app.use('/', require('./routes/userRoute'));


app.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/')
    })
})

app.listen(3001, function() {
    console.log('express server is running on port 3001');
})
