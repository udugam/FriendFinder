var path = require('path')
var fs = require('fs')

module.exports = function(app) {
    
    //This route will return a JSON of all friends
    app.get('/api/friends',function(req,res) {
        var friends = {}
        //retreive data from file
        fs.readFile('./app/data/friends.js','utf8',function(error,data) {
            if (error) throw error
            friends = JSON.parse(data)
            res.json(friends)
        })
        
    })
    
    //This route will add a new friend to the friends.js file while also running the compatability function
    app.post('/api/friends', function(req,res) {
        var friends = {}
        //declare and build friend object before inserting into data array
        var friend = {
            friendName: req.body.friendName,
            photoLink: req.body.photoLink,
            results: []
        }
        //convert results scores to integers then store in results array of friend object
        req.body.results.forEach(function(element) {
            friend.results.push(parseInt(element))
        });

        
        //retreive data array from file, and push new friend object to array
        fs.readFile('./app/data/friends.js','utf8',function(error,data) {
            if (error) throw error
            friends = JSON.parse(data)
            
            findMatch(friend,friends)
            
            friends.push(friend)
            
            
            //save array to file
            fs.writeFile('./app/data/friends.js', JSON.stringify(friends), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            res.redirect('./survey')
        })

        
        
        
    })
    //MATCHING FUNCTION
    function findMatch(friend, friends) {
        var matchResults = []
        console.log(friends)

        //iterate through friends array
        friends.forEach(function(element) {
            var differenceResults = []
            var candidateResults = element.results
            var friendResults = friend.results

            //calculate differences between survey results
            candidateResults.forEach(function(element, index) {
                differenceResults.push(Math.abs(element-friendResults[index]))
            })

            console.log(differenceResults)
        });
    }
    
}