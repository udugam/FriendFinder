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
        var friends = []
        var matchedFriend = {}

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
            //find matched friend
            matchedFriend = findMatch(friend,friends)
            //then push friend to friends array
            friends.push(friend)

            //save array to file
            fs.writeFile('./app/data/friends.js', JSON.stringify(friends), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

            //send friend object back to client to display as modal
            res.json(matchedFriend)
        })        
    })

    //MATCHING FUNCTION
    function findMatch(friend, friends) {
        var matchResults = []
        var match = {value: 50, index: 0} 

        //iterate through friends array
        friends.forEach(function(element) {
            var differenceResults = []
            var candidateResults = element.results
            var friendResults = friend.results

            //calculate differences between survey results
            candidateResults.forEach(function(element, index) {
                differenceResults.push(Math.abs(element-friendResults[index]))
            })

            matchResults.push(differenceResults.reduce(function(total,num) {
                return total+=num
            }, 0))
        });

        //determine lowest difference which will be the best match
        matchResults.forEach(function(element,index){
            if (element<match.value) {
                match.value = element
                match.index = index
            }
        })

        return friends[match.index]
    }
    
}