const mail = require('./mail');
const express = require('express');
const cors = require('cors');
const moment = require('moment');
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cors({ origin: ['http://localhost', 'https://forms.dvasquez4155.com/', 'https://dvasquez4155.com']}))

app.post("/", function(req,res) {
    mail(
            {
                name : req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message,
                time: moment().format('LLLL')
            }
        )
    res.send(req.body)
})
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))