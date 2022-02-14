const MONGODB_EVENTSDB = require('./secrets')

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_EVENTSDB);

app.use('/', require('./routes/eventRoute'));
app.use('/', require('./routes/userRoute'));

app.listen(3001, function() {
    console.log('express server is running on port 3001');
})
