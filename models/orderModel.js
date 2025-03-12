import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    Order_id : {type : String},
    Customer_id : {type : String},
    Restaurant_id : {type : String},
    Customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    Restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    Cart_reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    Subtotal: { type: Number, min: 0, default: 0 }, 
    Applied_coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }, 
    Total_payable: { type: Number, min: 0, default: 0 }, 
    Order_status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    Delivery_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);