import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore.js'


export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    socket:null,

    getUsers: async() => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get("/messages/users")
            set({ users:res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUsersLoading:false}) 
        }
    },
    getMessages: async(userId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages:res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isMessagesLoading:false}) 
        }
    },
    sendMessage: async (messageData) => {
        const {selectedUser,messages} = get()
        
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
        set({messages:[...messages,res.data]})
    } catch (error) {
        toast.error(error.response.message.data)
    }

    },

    subscribeToMessages: () => {
       const { selectedUser } = get()
       if(!selectedUser) return;

       const socket = useAuthStore.getState().socket;

       //optimize later 
       socket.on("newMessage" , (newMessage) => {

        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

        if(!isMessageSentFromSelectedUser) return;

        set({
            messages: [...get().messages , newMessage]
        })
       })

       socket.on("messageDeleted", (messageId) => {
        set({ messages: get().messages.filter((msg) => msg._id !== messageId) });
    });
    

    },
    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");

    },
    deleteMessage: async (messageId) => {
        try {
            await axiosInstance.delete(`/messages/${messageId}`); // API call to delete message
    
            // Ensure `messages` is always an array
            const messages = get().messages || []; 
            if (!Array.isArray(messages)) {
                console.error("Error: messages is not an array!", messages);
                return;
            }
    
            // Filter out the deleted message
            const updatedMessages = messages.filter((msg) => msg._id !== messageId);
            set({ messages: updatedMessages });
    
            // Emit delete event to other clients
            useAuthStore.getState().socket.emit("deleteMessage", messageId);
        } catch (error) {
            console.error("Delete Message Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to delete message");
        }
    },    
    
    
    
    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    }
}))