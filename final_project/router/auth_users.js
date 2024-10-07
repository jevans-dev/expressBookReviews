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

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    //check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    //check if the username exists and password is correct
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        //generate the JWT token
        const token = jwt.sign({ username }, 'access_secret_key', { expiresIn: '1h' });
        
        //store the token in the session
        req.session.token = token;

        //save the username in the session for future access
        req.session.username = username;

        //logging to check if session is being set correctly
        console.log("Session set:", req.session);

        //return success response without exposing the token
        return res.status(200).json({ message: "login successful" });
    } else {
        //return error if invalid credentials
        return res.status(401).json({ message: "invalid username or password" });
    }
});



//add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn; //get isbn from URL params
    const review = req.query.review; //get review from query parameters
    const username = req.session.username; //get username from session

    //check if isbn and review are provided
    if (!isbn || !review) {
        return res.status(400).json({ message: "isbn and review are required" });
    }

    //check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "book not found" });
    }

    //if user is logged in, add or update the review
    if (username) {
        if (!books[isbn].reviews) {
            books[isbn].reviews = {}; //initialize reviews if not present
        }
        books[isbn].reviews[username] = review; //add/update review by user
        return res.status(200).json({ message: "review successfully added/updated" });
    } else {
        return res.status(401).json({ message: "unauthorized user" });
    }
});

module.exports.authenticated = regd_users;
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
