import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import "../styles/UsersList.css";
import { useAuthStore } from "../store/useAuthStore";

const UserList = () => {
  const { users, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore(); // List of online users
  const [showOnlineOnly, setShowOnlineOnly] = useState(false); // Toggle state

  // Filter users based on checkbox state
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <div className="user-list">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="header-content">
          <Users className="icon" />
          <span className="header-text">Users</span>
        </div>
        
        {/* Checkbox to toggle online users */}
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={() => setShowOnlineOnly(!showOnlineOnly)}
          />
          Show Online Users
        </label>
      </div>

      {/* Display users based on filter */}
      {filteredUsers.map((user) => (
        <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`user-button ${
            selectedUser?._id === user._id ? "selected" : ""
          }`}
        >
          {/* Avatar */}
          <div className="avatar-container">
            <img
              src={user.profilePic || "/avatar.png"}
              className="avatar"
              alt="profile"
            />
            {onlineUsers.includes(user._id) && <span className="online-indicator"></span>}
          </div>

          {/* Username */}
          <div className="user-info">
            <div className="user-name">{user.fullName}</div>
            <div className="indicator-text">
              {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default UserList;
