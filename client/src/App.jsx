import PostCreate from "./PostCreate";
import PostList from "./postList";

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
