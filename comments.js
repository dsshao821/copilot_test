// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');

/* GET comments listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET /comments/new
router.get('/new', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Not login');
    return res.redirect('/login');
  }
  res.render('comments/new', {
    title: 'Comment',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  var comment = new Comment({
    content: req.body.content,
