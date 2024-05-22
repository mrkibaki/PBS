// components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaStar,
  FaEnvelope,
  FaBrain,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="navbar">
        <Link to="/" className="nav-item">
          <div className="icon-container">
            <FaHome />
          </div>
          <span>Home</span>
        </Link>
        <Link to="/thoughts" className="nav-item">
          <div className="icon-container">
            <FaBrain />
          </div>
          <span>Thoughts</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <div className="icon-container">
            <FaUser />
          </div>
          <span>Profile</span>
        </Link>
        <Link to="/friends" className="nav-item">
          <div className="icon-container">
            <FaUsers />
          </div>
          <span>Friends</span>
        </Link>
        <Link to="/favourites" className="nav-item">
          <div className="icon-container">
            <FaStar />
          </div>
          <span>Favourites</span>
        </Link>
        <Link to="/boards" className="nav-item">
          <div className="icon-container">
            <FaEnvelope />
          </div>
          <span>Message Boards</span>
        </Link>
        <div className="avatar">
          <img src={"src/assets/capibara.JPG"} alt="avatar" />
        </div>
      </div>
    </IconContext.Provider>
  );
};
export default NavBar;
