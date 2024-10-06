const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  //check if username and password are provided
  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
  }
  //check if the username exists and password is correct
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
      //generate a JWT token
      const token = jwt.sign({ username }, 'access_secret_key', { expiresIn: '1h' });     
      //store the token in the session
      req.session.token = token;
      //return success response without exposing the token
      return res.status(200).json({ message: "Login successful" });
  } else {
      //return error message if invalid credentials
      return res.status(401).json({ message: "Invalid username or password" });
  }
});



// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
