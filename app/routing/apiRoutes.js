var path = require('path')

module.exports = function(app) {
    //This route will return a JSON of all friends
    app.get('/api/friends',function(res,res) {
        res.sendFile(path.join(__dirname,'../data/friends.js'))
    })

    //This route will add a new friend to the friends.js file while also running the compatability function
    
}