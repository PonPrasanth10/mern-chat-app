import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import  SidebarSkeletons from './skeletons/SidebarSkeletons.jsx'
import UsersList from './UsersList.jsx';
import "../styles/Sidebar.css";

export const Sidebar = () => {

    const { getUsers, users,setSelected,selected,isUsersLoading} = useChatStore();

    const onlineUsers = [];

    useEffect( () => {
      getUsers()
    },[getUsers])
     
    

  return (
    <div className='sidebar-background'>
    <div className="users-list-div">
    {isUsersLoading ? <SidebarSkeletons /> : <UsersList />}
     
    </div>
    </div>
  )
}

export default Sidebar