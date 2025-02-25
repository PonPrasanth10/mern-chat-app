import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL=  import.meta.env.MODE === "development" ?  "http://localhost:5001" : "https://mern-chat-app-4m3r.onrender.com";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check", {withCredentials:true});
            console.log("Auth check response:", res.data);
            
            if (res.data) {
                set({ authUser: res.data });
                localStorage.setItem("authUser", JSON.stringify(res.data)); // Store in localStorage
                get().connectSocket();
            }
        } catch (error) {
            console.log("Error in checkAuth store: ", error?.message);
            set({ authUser: null });
            localStorage.removeItem("authUser"); // Clear on error
        } finally {
            set({ isCheckingAuth: false });
        }
    },
   

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            console.log("Signup response:", res.data); // Debugging
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            console.error("Signup error:", error);

            // Ensure error.response exists before accessing properties
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async(data) => {
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser: res.data});
            console.log(get().authUser); // ✅ Corrected 
            toast.success("Logged in successfully");
            get().connectSocket();
   
            // Force re-render to ensure state updates correctly
            window.location.reload();  
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        }
        finally{
            set({isLoggingIn:false})
        }
    },
   
    updateProfile: async(data) => {
      set({isUpdatingProfile:true})
      try {
        const res= await axiosInstance.put("/auth/update-profile",data)

        if (!res.data) {
            throw new Error("No data received from server");
          }

        set({authUser : res.data})
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("Error in update profile "+error)
        toast.error(error.response.data.message)
      }
      finally{
        set({isUpdatingProfile:false})
      }
    },
    connectSocket: async() => {
        const { authUser } =get()
        if(!authUser || get().socket?.connected ) return ;
        
        
        const socket =io(BASE_URL, {
            query:{
                userId:authUser._id
            }
        })
        socket.connect()

        set({ socket:socket })

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers:userIds})
        })

    },
    disconnectSocket: async() => {
        if(get().socket?.connected) get().socket.disconnect();
    },


    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket()
        } catch (error) {
            console.error("Logout error:", error);
            const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
            toast.error(errorMessage);
        }
    }
}));
