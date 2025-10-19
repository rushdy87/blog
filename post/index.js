const express = require("express");
const cors = require("cors");
const randomBytes = require("crypto").randomBytes;
const axios = require("axios");

const app = express();

const posts = {};

app.use(express.json());

app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://localhost:5005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res
    .status(201)
    .json({ message: "Post created successfully.", post: posts[id] });
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);
  res.send({});
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
