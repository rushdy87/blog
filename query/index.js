const express = require("express");
const cors = require("cors");

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

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "PostCreated": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "CommentCreated": {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      if (post) {
        post.comments.push({ id, content, status });
      }
      break;
    }
    case "CommentUpdated": {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      if (post) {
        const comment = post.comments.find((comment) => comment.id === id);
        if (comment) {
          comment.status = status;
          comment.content = content;
        }
      }
      break;
    }
    default:
      break;
  }

  console.log("Current Posts State:", posts);

  res.send({});
});

app.listen(5002, () => {
  console.log("Query service listening on port 5002");
});
