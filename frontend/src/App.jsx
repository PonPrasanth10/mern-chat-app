import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignUp from './pages/SignUp.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { LoaderCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import './styles/app.css'
import InfoPage from './pages/InfoPage.jsx';


const App = () => {


  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
   useEffect(() => {
      checkAuth();
   },[checkAuth])

   console.log({checkAuth})
   console.log({onlineUsers})

   if(isCheckingAuth && !authUser)
      return(
        <LoaderCircle className='load-icon' size={70}/>
      );
   

  return (
    
    <div>
    

    <Routes>
      <Route path='/' element={<InfoPage />}/>
      <Route path='/home' element={ authUser ? <HomePage/> : <Navigate to={"/login"} />}/>
      <Route path='/login' element={ authUser === undefined ? null : (!authUser ? <LogInPage/> : <Navigate to={"/home"}/> )}/>
      <Route path='/signup' element={ authUser === undefined ? null : (!authUser ? <SignUp/> : <Navigate to={"/home"} />)}/>

      <Route path='/aboutme' element={<SettingsPage/>}/>
      <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to={"/login"} />}/>
    </Routes>
    <Toaster />
    </div>
    
  )
}

export default App