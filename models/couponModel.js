
import mongoose from "mongoose";

const { Schema } = mongoose;

const couponSchema = new Schema({
    Coupon_code: {
        type: String,
        required: true,
        unique: true
    },
    Discount_rate: {
        type: Number,
        required: true
    },
    Minimum_order_amount: {
        type: Number,
        required: true
    },
    Maximum_discount: {
        type: Number,
        required: true
    },
    Valid_date: {
        type: Date,
        required: true
    },
    Active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Coupon = mongoose.model("Coupon", couponSchema);
