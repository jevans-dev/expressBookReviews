const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password} = req.body;
  //checks if username and password are provided
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  //checks  if username exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(409).json({message: "Username already exists"});
  }
  //register new user
  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered"});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.status(200).json(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //extract isbn
  const isbn = req.params.isbn;
  //checks if book is valid
  if (books[isbn]) {
    //return book details
    res.status(200).json(books[isbn]);
  } else {
    //return error message
    res.status(404).json({ message: "Book not found"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //extract author name
  const author = req.params.author.toLowerCase();
  //array to store books by author
  let booksByAuthor = [];
  //iterate books
  for (const bookId in books) {
    if (books[bookId].author.toLowerCase() === author){
      booksByAuthor.push(books[bookId]);
    }
  }
  //return books if found
  if (booksByAuthor.length > 0) {
    res.status(200).json(booksByAuthor);
  } else {
    //return error message if not found
    res.status(404).json({message: "No books found by this author"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //extract title from parameters
  const title = req.params.title.toLowerCase();
  //store the book that is found
  let bookByTitle = null;
  //iterate over books
  for (const bookId in books) {
    if (books[bookId].title.toLowerCase() === title) {
      bookByTitle = books[bookId];
      //stop when book is found
      break;
    }
  }
  //return if book is found
  if (bookByTitle) {
    res.status(200).json(bookByTitle);
  } else {
    //return an error message if book is not found
    res.status(404).json({message: "Book not found by this title"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //extract isbn
  const isbn = req.params.isbn;
  //check existing books
  if (books[isbn]) {
    //return reviews
    res.status(200).json(books[isbn].reviews);
  } else {
    //return error message if not found
    res.status(404).json({message: "Book not found"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
