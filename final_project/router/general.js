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

//task10
const axios = require('axios');
//get the book list available in the shop asynchronously using async/await
public_users.get('/', async function (req, res) {
    try {
        //simulate asynchronous behavior using Axios
        const getBooks = async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(books); //resolve with the books object
                }, 1000); //simulate a delay of 1 second
            });
        };

        const bookList = await getBooks(); //wait for the promise to resolve
        return res.status(200).json(bookList); //send the book list in response
    } catch (error) {
        return res.status(500).json({ message: "error retrieving books" });
    }
});

//task 11
//get book details based on isbn asynchronously using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
      const isbn = req.params.isbn;

      //simulate asynchronous behavior using a Promise
      const getBookByISBN = async (isbn) => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  const book = books[isbn]; //lookup book by ISBN
                  if (book) {
                      resolve(book); //resolve if found
                  } else {
                      reject({message: "Book not found"}); //reject if not found
                  }
              }, 1000); //simulate a delay of 1 second
          });
      };

      const bookDetails = await getBookByISBN(isbn); //wait for the promise to resolve
      return res.status(200).json(bookDetails); //send the book details in response
  } catch (error) {
      return res.status(404).json({message: error.message || "error retrieving book"}); //handle errors
  }
});

//task 12
//get book details based on author asynchronously using async/await
public_users.get('/author/:author', async function (req, res) {
  try {
      const author = req.params.author.toLowerCase(); // convert to lowercase for comparison
      
      //simulate asynchronous behavior using a Promise
      const getBooksByAuthor = async (author) => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  const filteredBooks = [];
                  //iterate through the books and check if the author matches
                  for (let key in books) {
                      if (books[key].author.toLowerCase() === author) {
                          filteredBooks.push(books[key]); //add the matching book
                      }
                  }
                  if (filteredBooks.length > 0) {
                      resolve(filteredBooks); //resolve if books are found
                  } else {
                      reject({message: "No books found by this author"}); //reject if no books are found
                  }
              }, 1000); //simulate a delay of 1 second
          });
      };

      const booksByAuthor = await getBooksByAuthor(author); //wait for the promise to resolve
      return res.status(200).json(booksByAuthor); //send the books in response
  } catch (error) {
      return res.status(404).json({message: error.message || "error retrieving books by author"}); //handle errors
  }
});

//task 13
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title.toLowerCase(); // convert to lowercase for comparison
    
    //simulate asynchronous behavior using a Promise
    const getBooksByTitle = async (title) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const filteredBooks = [];
                //iterate through the books and check if the title matches
                for (let key in books) {
                    if (books[key].title.toLowerCase() === title) {
                        filteredBooks.push(books[key]); //add the matching book
                    }
                }
                if (filteredBooks.length > 0) {
                    resolve(filteredBooks); //resolve if books are found
                } else {
                    reject({message: "No books found with this title"}); //reject if no books are found
                }
            }, 1000); //simulate a delay of 1 second
        });
    };

    const booksByTitle = await getBooksByTitle(title); //wait for the promise to resolve
    return res.status(200).json(booksByTitle); //send the books in response
} catch (error) {
    return res.status(404).json({message: error.message || "error retrieving books by title"}); //handle errors
}
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
