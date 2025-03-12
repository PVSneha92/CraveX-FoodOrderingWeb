import mongoose from "mongoose";

const {Schema} = mongoose
const restaurantSchema = new Schema({
    Restaurant_id : {type : String},
    Restaurant_name : {type : String, required:true, maxlength:25},
    Address : {type:String,required:true},
    Phone_number : {type:Number, required:true, match: [/^\d{10}$/, "Invalid phone number. It must be exactly 10 digits."] },
    Email : {type:String, required:true, unique:true},
    Operating_hours : {type:Number, required:true, maxlength:10},
    Restaurant_Image: { type: String },
    Rating: { type: Number, min: 1, max: 5 },
    Associated_seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},
{ timestamps: true }

);


export const Restaurant = mongoose.model("Restaurant",restaurantSchema);