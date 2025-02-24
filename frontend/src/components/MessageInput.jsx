import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import '../styles/MessageInput.css'
import { X,Image,Send } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {

    const [ text,setText ] = useState("")
    const fileInputRef = useRef(null)
    const [ imagePreview,setImagePreview] = useState(null)
    const { sendMessage } = useChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    
    }

    const removeImage = (e) => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage = async(e) => {
        e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="message-input-container">
    {imagePreview && (
      <div className="mi-image-preview-container">
        <div className="mi-image-wrapper">
          <img src={imagePreview} alt="Preview" className="mi-preview-image" />
          <button onClick={removeImage} className="mi-remove-image-btn" type="button">
            <X size={30} color='white'/>
          </button>
        </div>
      </div>
    )}

    <form onSubmit={handleSendMessage} className="mi-message-form">
      <div className="mi-input-group">
        <input
          type="text"
          className="mi-message-input"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Hidden File Input with Clickable Icon */}
        <div className="mi-file-upload-container">
          <input
            type="file"
            accept="image/*"
            className="mi-file-input"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button type="button" className="mi-upload-btn" onClick={() => fileInputRef.current?.click()}>
            <Image size={35} color='#d1d2d5'/>
          </button>
        </div>
      </div>
      <div className="mi-send-btn-div">
      <button type="submit" className="mi-send-btn" disabled={!text.trim() && !imagePreview}>
        <Send size={22} color='black'/>
      </button>
      </div>
    </form>
  </div>
);
};
export default MessageInput