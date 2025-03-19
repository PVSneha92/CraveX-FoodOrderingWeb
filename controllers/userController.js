import bcrypt from "bcryptjs";
import {Customer} from "../models/userModel.js"
import { createToken } from "../utils/token.js";



export async function signUp(req, res) {
  try {
    const { Customer_name, Email, Phone_number, Password, Customer_pic , Role } = req.body;
    const userExist = await Customer.findOne({ Email: Email });
    if (userExist) {
      return res.status(400).json({ message: "Email already connected" });
    }
    if (!Customer_name || !Email || !Phone_number || !Password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    
    const hashedPassword = bcrypt.hashSync(Password, 10);
    
    const newUser = new Customer({
      Customer_name,
      Email,
      Phone_number,
      Password: hashedPassword,
      Customer_pic,
      Role,
    });

    await newUser.save();
    const token = createToken(newUser);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Signed Up Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function Login(req, res) {
  try {
    const { Email, Password } = req.body;

    // Check if both Email and Password are provided
    if (!Email || !Password) {
      return res.status(400).json({ message: "Please enter required fields." });
    }

    // Find user by email
    const user = await Customer.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compare password
    const passwordValidation = bcrypt.compareSync(Password, user.Password);
    if (!passwordValidation) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = createToken(user);

    // Set token in the cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Send success response
    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function updateProfile(req,res) {
  try {
    const {Customer_name,Email,Phone_number,Customer_pic} = req.body
    const userId = req.customers.id
    if (!userId) {
      return res.status(401).json({message:"Unauthorized User"})
    }
    const user = await Customer.findByIdAndUpdate(
      userId,
      {Customer_name,Email,Phone_number,Customer_pic},
      {new:true}
    )
    return res.status(200).json({message:"Updated Profile",user})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchRole(req,res) {
  try {
    const user = await Customer.findById(req.customers.id).select("role")
    if (!user){
      return res.status(404).json({message:"User not Found"})
    }
    res.status(200).json({message:"User Found",user})
  } catch (error) {
    console.error("error while fetching role",error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function Profile(req,res) {
  try {
    const user = await Customer.findById(req.customers.id).select("-Password")
    if (!user){
      return res.status(404).json({message:"User not Found"})
    }
    res.status(200).json({message:"User found",user})
  } catch (error) {
    console.error("error while fetching Data",error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
