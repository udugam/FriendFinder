var path = require('path')

module.exports = function(app) {
    //This is the survey route
    app.get('/survey', function(req,res) {
        res.sendFile(path.join(__dirname,'../public/survey.html'))
    })

    //This is the default home route
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname,'../public/home.html'))
    })
}