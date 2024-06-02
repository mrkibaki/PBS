// components/Post.tsx
import React from "react";
import { useState } from "react";
import Modal from "react-modal";

interface PostProps {
  blogId: string;
  username: string;
  userAvatar: string;
  date: string;
  title: string;
  content: string;
  imageUrl?: string;
  onDelete: (blogId: string) => void;
}

const Post: React.FC<PostProps> = ({
  blogId,
  username,
  userAvatar,
  date,
  title,
  content,
  imageUrl,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(blogId);
    closeModal();
  };

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
        <button className="Delete" onClick={openModal}>
          Delete
        </button>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleDelete}>Confirm</button>
        </Modal>
      </div>
    </div>
  );
};

export default Post;
