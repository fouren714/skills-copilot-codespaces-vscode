// Create web server
// Import express module
var express = require('express');
var app = express();
// Import body-parser module
var bodyParser = require('body-parser');
// Import mongoose module
var mongoose = require('mongoose');
// Import Comment model
var Comment = require('./models/Comment');
// Import Post model
var Post = require('./models/Post');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments');
// Use body-parser module
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Create new comment
app.post('/comments', function(req, res) {
    // Create new comment
    var comment = new Comment();
    // Set the comment properties that came from the POST data
    comment.author = req.body.author;
    comment.text = req.body.text;
    // Save the comment and check for errors
    comment.save(function(err) {
        if (err)
            res.send(err);
        res.json({
            message: 'Comment created!'
        });
    });
});
// Get all comments
app.get('/comments', function(req, res) {
    // Find all comments
    Comment.find(function(err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});
// Get comment by id
app.get('/comments/:comment_id', function(req, res) {
    // Find comment by id
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});
// Update comment by id
app.put('/comments/:comment_id', function(req, res) {
    // Find comment by id
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err)
            res.send(err);
        // Update the comment properties that came from the PUT data
        comment.author = req.body.author;
        comment.text = req.body.text;
        // Save the comment and check for errors
        comment.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Comment updated!'
            });
        });
    });
});
// Delete comment by id
app.delete('/comments/:comment_id', function(req, res) {
    // Remove comment by id
    Comment.remove({
        _id: req.params.comment_id
    }, function(err, comment)
