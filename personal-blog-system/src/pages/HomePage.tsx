// HomePage.tsx
import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import PostList from "../components/PostList";
import CreatePostButton from "../components/CreatePostButton";
import { UserContext } from "../components/UserContext";

const HomePage: React.FC = () => {
  const { user } = useContext(UserContext);
  console.log("user in homepage is :", user);
  return (
    <div className="App">
      <NavBar />
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>
      <div style={{ paddingTop: "64px" }}>
        <PostList />
      </div>
      <CreatePostButton username={user ? user.username : null} />
    </div>
  );
};

export default HomePage;
