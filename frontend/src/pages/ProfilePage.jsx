import React, { useState } from 'react'
import '../styles/ProfilePage.css'
import {  CameraIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import Navbar from '../components/Navbar.jsx'
import { BorderBeam } from "@stianlarsen/border-beam";

const ProfilePage = () => {

  const {authUser,isUpdatingProfile,updateProfile} = useAuthStore()
  const [selectedImg,setSelectedImg] = useState(null)

  const handleImageUpload = (e) => {
    const file=e.target.files[0]
    if(!file) return ;
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = async() => {
      const base64Image = reader.result;
      setSelectedImg(base64Image)
      await updateProfile({ profilePic:base64Image })
    }

  }

  return (
    <div className='profile-background'>
    <Navbar />
    <div className="profile-container-center">
    <div className='profile-container' >
    <BorderBeam size={300} duration={5} colorFrom="#FFFFFF" colorTo="#ADD8E6"/>
       <h1 className="profile-title">Profile</h1>
       <p className="profile-des">Your Profile information</p>
       <div className="image-container">
        <img 
        src={selectedImg || authUser.profilePic || "/avatar.png"}
         alt="Profile pic" className='profile-image'
          
         />
        <label className='file-input-container'>
        <div className="camera-icon-wrapper">

         <CameraIcon size={20} className='camera-icon' color='black'/>
         <input 
         type="file"
         accept='image/*'
         className='profile-file-input'
         onChange={handleImageUpload}
         disabled={isUpdatingProfile}
          />
        </div>
        </label>
       </div>
       <p className="imageinfo">
       {isUpdatingProfile ? "Uploading..." : "Click the icon tho update your profile"}
       </p>
       <div className="profile-details">
  <div className="profile-info">
    <span>Full Name :</span> <span>{authUser?.fullName}</span>
  </div>
  <p className="profile-info">
    <span>Email :</span> <span>{authUser?.email}</span>
  </p>
  <p className="profile-info">
    <span>Member since: </span> 
    {authUser?.createdAt
        ? `${new Date(authUser.createdAt).toLocaleDateString()} at ${new Date(authUser.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}`
        : "N/A"}
</p>

  <p className="profile-info">
    <span>Account Status :</span><span className='acc-status'>Active</span>
  </p>
</div>

    </div>
    </div>
    </div>
  )
}

export default ProfilePage