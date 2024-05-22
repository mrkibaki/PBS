// components/Post.tsx
import React from "react";

interface PostProps {
  blogId: string;
  username: string;
  userAvatar: string;
  date: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({
  blogId,
  username,
  userAvatar,
  date,
  title,
  content,
  imageUrl,
}) => {
  console.log(blogId);

  return (
    <div className="post">
      <div className="post-header">
        <img src={userAvatar} alt="user avatar" className="avatar" />
        <div>
          <p className="username">{username}</p>
          <p className="date">{date}</p>
        </div>
      </div>
      <p className="title">{title}</p>
      <p className="content">{content}</p>
      {imageUrl && <img src={imageUrl} alt="post" className="post-image" />}
      <div className="post-footer">
        <button className="like-button">Like</button>
        <button className="comment-button">Comments</button>
      </div>
    </div>
  );
};

export default Post;
