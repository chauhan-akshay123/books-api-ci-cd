const request = require("supertest");
const http = require("http");
const { getAllBooks } = require("../controllers");
const { app } = require("../index.js");
const { beforeEach } = require("node:test");

jest.mock("../controllers", () => {
  const actualModule = jest.requireActual("../controllers");
  return {
    ...actualModule,
    getAllBooks: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controller Function Tests", () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });
 
 it("Should return all books", () => {
  const mockBooks = [
    {
        'bookId': 1,
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee',
        'genre': 'Fiction'
    },
    {
        'bookId': 2,
        'title': '1984',
        'author': 'George Orwell',
        'genre': 'Dystopian'
    },
    {
        'bookId': 3,
        'title': 'The Great Gatsby',
        'author': 'F. Scott Fitzgerald',
        'genre': 'Classic'
    }
  ];
  getAllBooks.mockReturnValue(mockBooks);
  let result = getAllBooks();

  expect(result).toEqual(mockBooks);
  expect(result.length).toBe(3);
 });
});

describe("API Endpoints Tests", () => {
 it("GET /books should get all books", async () => {
  const mockResponse = {
    "books": [
      {
        "bookId": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction"
      },
      {
        "bookId": 2,
        "title": "1984",
        "author": "George Orwell",
        "genre": "Dystopian"
      },
      {
        "bookId": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic"
      }
    ]
  };
  const response = await request(server).get("/books");

  expect(response.statusCode).toEqual(200);
  expect(response.body).toEqual(mockResponse);
  expect(response.body.books.length).toBe(3);
 });
 
 it("GET /books/details/:id should get book details by Id", async () => {
  const mockResponse = {
    "book": {
      "bookId": 1,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "genre": "Fiction"
    }
  };

  const response = await request(server).get("/books/details/1");
  expect(response.statusCode).toEqual(200);  
  expect(response.body).toEqual(mockResponse);  
});
});
