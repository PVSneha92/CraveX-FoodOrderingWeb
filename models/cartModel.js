import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    Items: [
        {
            Menu_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu",
                required: true
            },
            Quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            Total_item: {
                type: Number,
                required: true,
                min: 0,
            }
        }
    ],
    Cart_total: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    Final_amount: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    Status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    }
}, { timestamps: true });

cartSchema.method.calulateTotalPrice = function(){
    this.Cart_total = this.items.reduce((total,items)=> total + items.price,0);
  }

  export default mongoose.model("Cart", cartSchema);