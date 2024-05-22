// create web server with express
//import express from 'express';
const express = require('express');
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
// import body-parser
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/comments');
const db = mongoose.connection;
db.on('error', () => {
  console.log('Connection error');
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// import Comment
const Comment = require('./models/comment');
// middleware for parsing body
app.use(bodyParser.json());
// get all comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).json(comments);
  });
});
// get comment by id
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).json(comment);
  });
});
// create comment
app.post('/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(201).json(comment);
  });
});
// update comment
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, comment) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).json(comment);
  });
});
// delete comment
app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(204).json();
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//export default app;
module.exports = app;

