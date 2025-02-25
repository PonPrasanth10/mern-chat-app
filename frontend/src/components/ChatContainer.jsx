import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import "../styles/chatBubble.css";
import { Loader } from "lucide-react";
import { Trash } from "lucide-react";


export const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    unsubscribeFromMessages,
    subscribeToMessages,

  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <ChatHeader />

      {/* Loading State */}
      {isMessagesLoading ? (
        <div className="cc-loading-container">
          <Loader className="cc-loading-icon" />
        </div>
      ) : (
        <div className="cm-messages-wrapper">
          {messages.map((message) => {
            const isSentByUser = message.senderId === authUser._id;

            return (
              <div key={message._id} className={`cm-chat-bubble-container ${isSentByUser ? "sent" : "received"}`} ref={messageEndRef}>
                {/* Avatar */}
                <div className="cm-avatar">
                  <img
                    src={isSentByUser ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                    alt="profile"
                  />
                </div>

                {/* Chat Bubble */}
                <div className="cm-chat-bubble">
                  {message.image && <img src={message.image} alt="Attachment" className="cm-message-image" />}
                  {message.text && <p>{message.text}</p>}
                  <span className="cm-message-time">{new Date(message.createdAt).toLocaleTimeString()}
                  {/* {isSentByUser && (
                    <button className="cm-delete-btn" onClick={() => deleteMessage(message._id)}>
                        <Trash size={16} />
                    </button>
                )} */}
                  </span>
                  

                </div>
              </div>
            );
          })}

          {/* Auto-scroll Dummy Div */}
          <div ref={messageEndRef}></div>
        </div>
      )}

      <div className="mi-pos">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
