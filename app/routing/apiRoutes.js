var path = require('path')
var fs = require('fs')

module.exports = function(app) {
    //This route will return a JSON of all friends
    app.get('/api/friends',function(req,res) {
        res.sendFile(path.join(__dirname,'../data/friends.js'))
    })

    //This route will add a new friend to the friends.js file while also running the compatability function
    app.post('/api/friends', function(req,res) {
        console.log(req.body)
    })
    
}