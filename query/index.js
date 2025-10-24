const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};
/** Quick example of data structure
 * posts = {
 *  "postId1": {
 *    id: "postId1",
 *    title: "Post Title 1",
 *    comments: [
 *      { id: "commentId1", content: "Comment Content 1", status: "approved" },
 *      { id: "commentId2", content: "Comment Content 2", status: "pending" }
 *    ]
 *  }
 * }
 */

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      const comment = post.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
    }
  }
};

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(5002, async () => {
  console.log("Query service listening on port 5002");

  try {
    const res = await axios.get("http://event-bus-srv:5005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
