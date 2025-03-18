import { Coupon } from "../models/couponModel.js";
import { Customer } from "../models/userModel.js";

export async function addCoupon(req,res) {
    try {
        const user = await Customer.findById(req.customers.id)
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        const {Coupon_code,Discount_rate,Minimum_order_amount,Maximum_discount,Valid_date,Active} = req.body
        if(!Coupon_code || !Discount_rate || !Minimum_order_amount || !Maximum_discount ||!Valid_date){
            return res.status(401).json({message: "Please enter all fields"})
        }
        const couponExist = await Coupon.findOne({Coupon_code:Coupon_code})
        if(couponExist){
return res.status(400).json({message:"Coupon code Already Exist"})
        }
        const addCoupon = new Coupon(
            {
                Coupon_code,Discount_rate,Minimum_order_amount,Maximum_discount,Valid_date,Active  
            }
        )
        await addCoupon.save()
    res.status(201).json({ message: "New Coupon Successfully Added", addCoupon });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}