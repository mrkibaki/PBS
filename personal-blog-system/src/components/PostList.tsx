import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { UserContext } from "./UserContext";

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
  const [noPosts, setNoPosts] = useState(false);
  const { user } = useContext(UserContext);

  const handleDelete = (blogId: string) => {
    fetch(`http://localhost:8000/posts/delete/${blogId}`, {
      method: "DELETE",
    }).then(() => {
      setPosts(posts.filter((post) => post.blogId !== blogId));
      window.location.reload();
    });
  };

  useEffect(() => {
    if (user) {
      // 检查 user 是否存在
      console.log(user);
      fetch(`http://localhost:8000/posts/?username=${user.username}`) // 根据用户名获取博客
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            // 如果没有博客
            setNoPosts(true); // 设置 noPosts 为 true
          } else {
            setPosts(data); // 否则，设置博客数据
          }
        });
    }
  }, [user]);

  return (
    <div>
      {noPosts ? ( // 如果 noPosts 为 true
        <div style={{ textAlign: "center" }}>
          You haven't post any blog yet, start your first blog! XD
        </div> // 显示提示信息
      ) : (
        posts
          .filter((post) => post.username === user.username)
          .map(
            (
              post // 否则，显示博客列表
            ) => (
              <Post
                key={post.id}
                blogId={post.blogId}
                username={post.username}
                userAvatar={post.userAvatar}
                date={post.date}
                title={post.title}
                content={post.content}
                imageUrl={post.imageUrl}
                onDelete={handleDelete}
              />
            )
          )
      )}
    </div>
  );
};

export default PostList;
