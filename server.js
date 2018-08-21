var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

//Setup Express App
var app = express()
var PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Server Start
app.listen(PORT, function() {
    console.log(`Server is listening on PORT ${PORT}`)
})