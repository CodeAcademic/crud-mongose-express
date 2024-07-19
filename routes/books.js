var express = require('express');
var Book = require('../models/book');
var router = express.Router();

router.get('/', function(req, res){
    console.log('getting all books');
    Book.find({}).exec(function(err, books){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(books);
            res.json(books);
        }
    });
});

router.get('/:id', function(req, res){
    console.log('getting one book');
    Book.findOne({
        _id: req.params.id
    }).exec(function(err, book){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(book);
            res.json(book);
        }
    });
});

router.post('/', function(req, res){
    var newBook = new Book();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;
    newBook.save(function(err, book){
        if(err) {
            res.send('error saving book');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});

router.put('/:id', function(req, res){
    Book.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        }
    },{
        upsert: true
    },function(err, newBook){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newBook);
            res.send(newBook);
        }
    });
});

router.delete('/:id', function(req, res){
    Book.findByIdAndRemove({
        _id: req.params.id
    },function(err, book){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});

module.exports = router;