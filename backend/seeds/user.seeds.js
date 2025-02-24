import { config } from "dotenv";
import { connectDB } from "../lib/database.js"
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "Ethan.Carter@example.com",
    fullName: "Ethan Carter",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  {
    email: "Daniel.Hayes@example.com",
    fullName: "Daniel Hayes",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/2.jpg",
  },
  {
    email: "Liam.Bennett@example.com",
    fullName: "Liam Bennett",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/3.jpg",
  },
  {
    email: "Noah.Sullivan@example.com",
    fullName: "Noah Sullivan",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/4.jpg",
  },
  {
    email: "James.Mitchell@example.com",
    fullName: "James Mitchell",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/5.jpg",
  },
  {
    email: "Lucas.Anderson@example.com",
    fullName: "Lucas Anderson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/6.jpg",
  },
  {
    email: "Henry.Collins@example.com",
    fullName: "Henry Collins",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/7.jpg",
  },
  {
    email: "Ryan.Parker@example.com",
    fullName: "Ryan Parker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/lego/8.jpg",
  },

 
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();