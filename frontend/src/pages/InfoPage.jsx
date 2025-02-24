import React from 'react'
import LiquidChrome from '../externalcomponents/LiquidChrome.jsx'
import '../styles/InfoPage.css'
import GlitchText from '../externalcomponents/GlitchText.jsx'
import DecryptedText from '../externalcomponents/DecryptedText.jsx'
import { Link } from 'react-router-dom'

const InfoPage = () => {
  return (
    <div className='infopage-body'>
    <div className="infopage-background">
    <LiquidChrome
    baseColor={[0.1, 0.1, 0.1]}
    speed={0.5}
    amplitude={0.1}
    interactive={false}
  />
    </div>
    <div className="ic-center">

    <div className="info-container">
      <div className="info-title">
      <div>
        <GlitchText 
        speed={1}
        enableShadows={false}
        enableOnHover={true}
        className='custom-class'
        >
         CHAT-APP
        </GlitchText>
      </div>
      </div>
      <div className="info-text">
        
<DecryptedText
text={`Welcome to our chat app, built using the powerful MERN stack for seamless communication .Stay connected with friends, family, and colleagues in real time with a fast and secure messaging experience . Enjoy rich features like media sharing and notifications Join now and experience next-level communication with our modern chat platform!`}
speed={120}
maxIterations={20}
characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
className="revealed"
parentClassName="all-letters"
encryptedClassName="encrypted"
animateOn="view"
  revealDirection="center"
/>


      </div>
      <div className="info-btn">

      <div className="info-login-btn">
      <Link to='/login'>

      <button className="custom-button" >Login</button>
      </Link>
      </div>
      <div className="info-signup-buton">
      <Link to='/signup'>

      <button className="custom-button" >Signup</button>
      </Link>
      </div>
      </div>
    </div>
    </div>

    </div>
  )
}

export default InfoPage