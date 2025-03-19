import mongoose from "mongoose";

const {Schema} = mongoose

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String }, // Example: "Beverages", "Main Course", etc.
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);

const restaurantSchema = new Schema({
    Restaurant_name : {type : String, required:true, maxlength:25},
    Phone_number : {type:Number, required:true, match: [/^\d{10}$/, "Invalid phone number. It must be exactly 10 digits."] },
    Email : {type:String, required:true, unique:true},
    Password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isOpen : {type:Boolean, required:true,default:false},
    Restaurant_Image: { type: String },
    Rating: { type: Number, min: 1, max: 5 },
    menu: [menuItemSchema], 
    createdAt: { type: Date, default: Date.now },
}
);


export const Restaurant = mongoose.model("Restaurant",restaurantSchema);