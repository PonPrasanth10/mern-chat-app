import React from 'react'
import { BorderBeam } from "@stianlarsen/border-beam";
import Navbar from '../components/Navbar.jsx'
import '../styles/SettingsPage.css'


const SettingsPage = () => {
  return (
    <div className='aboutme-background'>
    <Navbar />
    <div className="aboutme-container-center">
    <div className='aboutme-container' >
    
       <h1 className="aboutme-title">About Me</h1>
       <p className="aboutme-des">Hey there! I'm Pon Prasanth R, a passionate college student and an enthusiastic MERN Stack and Full-Stack Developer. I thrive on building dynamic and interactive web applications, constantly pushing myself to learn and grow in the ever-evolving world of development.

This app is a reflection of my journey-crafted to enhance my skills, experiment with new technologies, and bring ideas to life. I love solving problems, exploring new frameworks, and turning concepts into reality through code.

Let's build something amazing together! 🚀</p>
       
        

    </div>
    </div>
    </div>
  )
}

export default SettingsPage