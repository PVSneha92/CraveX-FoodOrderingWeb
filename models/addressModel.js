
import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    Customer_name: { type: String, required: true, maxlength: 50 }, 
    House_name: { type: String, required: true, maxlength: 50 }, 
    Full_address: { type: String, required: true, maxlength: 50 }, 
    Landmark: { type: String, required: true, maxlength: 50 }, 
    City: { type: String, required: true, maxlength: 50 }, 
    State: { type: String, required: true, maxlength: 50 }, 
    Pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid postal code format. It must be exactly 6 digits."], 
    },
    Phone_number: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid contact number. It must be exactly 10 digits."], 
    },
    User_reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } 
);

export const CustomerAddress = mongoose.model("Address", addressSchema);
