const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
const port = 5001;

app.use(express.json());

app.use(cors());

// In-memory storage for comments
let commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).json(commentsByPostId[req.params.id] || []);
});

// Add a new comment
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).json(comments);
});

app.listen(port, () => {
  console.log(`Comments service listening at http://localhost:${port}`);
});
