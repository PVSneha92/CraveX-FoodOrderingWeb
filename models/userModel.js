import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  Customer_name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Phone_number: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    maxlength: 100,  // Increase this to allow longer hashed passwords
  },
  Customer_pic: {
    type: String,
    required: false,
  },
  Role: {
    type: String,
    enum : ["User","Admin","Seller"],
    default: "User"
  },
  createdAt : {type:Date,default:Date.now}
});

export const Customer = mongoose.model("Customer", customerSchema);
