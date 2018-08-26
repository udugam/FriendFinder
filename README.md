# FriendFinder
This app asks a user to fill out 10 questions before getting matched with another person in the database that has answered the questions similarily.

# Under the hood
This app uses express.js and node in the backend. Bootstrap and html are used for the frontend. A simple friends database exists stored as an array of objects in data/friends.js.

Friend matches are determined by summing up the absolute values of the differences between the user and every candidate in the existing survey results. The first lowest sum is the suggested friend that gets sent back from the server to the client to display in a modal.
