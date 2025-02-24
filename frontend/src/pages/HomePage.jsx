import React from 'react'
import Navbar from '../components/Navbar.jsx'
import '../styles/Navbar.css'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import { Sidebar } from '../components/Sidebar'
import '../styles/HomePage.css'
import '../styles/Sidebar.css'
import '../styles/NoChatSelected.css'

const HomePage = () => {

  const { selectedUser } = useChatStore()

  return (
    <div className='homepage-background'>
    <Navbar />
      <div className='homepage-container-center'>
        <div className='homepage-container'>
          <div className='homepage-split'>
          <Sidebar />
          <div className="chat-section">
             {!selectedUser ? <NoChatSelected /> : <ChatContainer />} 
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage