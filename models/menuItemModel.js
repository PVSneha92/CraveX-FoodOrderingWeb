import mongoose from "mongoose";

const { Schema } = mongoose;

const menuItemSchema = new Schema(
  {
    Item_id : {type : String},
    Restaurant_id : {type : String},
    Item_name: { type: String, required: true, maxlength: 50 }, 
    Item_description: { type: String, required: true, maxlength: 200 }, 
    Item_price: { type: Number, required: true, maxlength: 10 }, 
    Item_image: { type: String }, 
    Availability_status: { type: Boolean, default: true }, 
    Linked_restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true, 
    },
  },
  { timestamps: true } 
);


export const Menu = mongoose.model("Menu", menuItemSchema);