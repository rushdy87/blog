const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

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
app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:5005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId },
  });

  res.status(201).json(comments);
});

// Event handler
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received Event:", type);

  switch (type) {
    case "CommentModerated": {
      const { id, postId, content, status } = data;
      const comments = commentsByPostId[postId] || [];
      const comment = comments.find((c) => c.id === id);
      if (comment) {
        comment.status = status;
      }
      await axios.post("http://localhost:5005/events", {
        type: "CommentUpdated",
        data: { id, postId, content, status },
      });
      break;
    }
    default:
      break;
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Comments service listening at http://localhost:${port}`);
});
