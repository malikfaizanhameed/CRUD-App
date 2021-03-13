const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Password321",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM movie_review";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_review (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_review WHERE movieName = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put('/api/update', (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  sqlUpdate = "UPDATE movie_review SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  })
});

app.get("/", (req, res) => {
  console.log("HOME PAGE");
  const sql =
    "INSERT INTO movie_review (movieName, movieReview) VALUES('batman', 'best movie')";

  db.query(sql, (err, result) => {
    res.send("<h1>This is the server!!!</h1>");
  });
});

app.listen(3001, () => {
  console.log("Listening on port 3001!");
});
