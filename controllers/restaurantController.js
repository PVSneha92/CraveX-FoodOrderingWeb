
import { cloudinaryInstance } from "../config/cloudinary.js";
import{Restaurant} from "../models/restaurantModel.js"
import bcrypt from "bcryptjs";
import{createToken} from "../utils/token.js"

export const addRestaurant = async (req, res) => {
  try {
    const { Restaurant_name, Email, Phone_number, Password, Restaurant_Image } = req.body;
    const existingRestaurant = await Restaurant.findOne({ Email });
    if (existingRestaurant) {
      return res.status(400).json({ message: "Email already existed" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No Restaurant Image uploaded" });
    }
    const Restaurant_ImageUri = await cloudinaryInstance.uploader.upload(req.file.path);
    const hashedPassword = await bcrypt.hash(Password, 10);
    const addRestaurant = new Restaurant({
      Restaurant_name,
      Email,
      Phone_number,
      Password: hashedPassword,
      Restaurant_Image:Restaurant_ImageUri.url,
    });

    await addRestaurant.save();
    const token = createToken(addRestaurant);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Restaurant successfully Registered",addRestaurant });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
};

 export const loginRestaurant = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const restaurant = await Restaurant.findOne({ Email });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (!restaurant.isVerified) {
      return res.status(403).json({ message: "Restaurant is not verified. Please wait for admin approval." });
    }
    const isMatch = await bcrypt.compare(Password, restaurant.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(restaurant);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export async function updateRestaurant(req, res) {
  try {
    const { restaurantId } = req.params;
    const { Restaurant_name, Email, Phone_number,rating,isOpen } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (Restaurant_name) restaurant.Restaurant_name = Restaurant_name;
    if (Email) restaurant.Email = Email;
    if (Phone_number) restaurant.Phone_number = Phone_number;
    if (rating) restaurant.Rating = rating;
    if(isOpen) restaurant.isOpen = isOpen;
    if (req.file) {
      const Restaurant_ImageUri = await cloudinaryInstance.uploader.upload(req.file.path);
      restaurant.Restaurant_Image = Restaurant_ImageUri.url;
    }
    const updateRestaurant = await restaurant.save();
    return res
      .status(200)
      .json({ message: "Restaurant updated Successfully", updateRestaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getRestaurantByName(req,res) {
  try {
    const {restaurantName} = req.params
    const restaurant = await Restaurant.findOne({Restaurant_name:{$regex:restaurantName,$options:"i" }}).select("-Password")
    if(restaurant.length=== 0)  {
return res.status(404).json({message:"Restaurant Not Found"})
    }
    res.status(200).json({message:"Restaurant Found", restaurant})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllRestaurant(req,res) {
  try {
    const restaurant = await Restaurant.find()
    res.status(200).json({message:"All Restaurant Are Fetched", restaurant})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getRestaurantById(req,res) {
  try {
    const {restaurantId} = req.params
    const findRestaurant = await Restaurant.findById(restaurantId)
    if(!findRestaurant){
return res.status(404).json({message:"Restaurant not found"})
    }
    res.status(200).json({message: "Restaurant Fetched Successfully",findRestaurant})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
}

export async function deleteRestaurant(req,res) {
  try {
    const {restaurantId} = req.params
const findRestaurant = await Restaurant.findById(restaurantId)
    if(!findRestaurant){
return res.status(404).json({message:"No Restaurant found"})
    }
const restaurantDel = await Restaurant.findByIdAndDelete(restaurantId)
res.status(200).json({message:"Restaurat Have Been Deleted Successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
}

export async function logout(req,res) {
  try {
    res.clearCookie("token")
    res.status(200).json({message:"Logged Out Succesfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 

