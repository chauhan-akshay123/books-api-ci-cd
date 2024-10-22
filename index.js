const cors = require("cors");
const express = require("express");
const { execPath } = require("process");
const { getAllBooks, getBookById } = require("./controllers");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to get all books
app.get("/books", async (req, res) => {
 const books = await getAllBooks();
 res.status(200).json({ books });
});

// Endpoint to get book by Id
app.get("/books/details/:id", async (req, res) => {
 const book = await getBookById(parseInt(req.params.id));
 res.status(200).json({ book });
});

module.exports = { app };

