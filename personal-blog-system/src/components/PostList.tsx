import { useEffect, useState } from "react";
import Post from "./Post";

interface PostData {
  id: string;
  blogId: string;
  username: string;
  userAvatar: string;
  date: string;
  title: string;
  content: string;
  imageUrl: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/posts/")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          blogId={post.blogId}
          username={post.username}
          userAvatar={post.userAvatar}
          date={post.date}
          title={post.title} // Add the 'title' property here
          content={post.content}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default PostList;
