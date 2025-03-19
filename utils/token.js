import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (customers) => {
    try {
        const token = jwt.sign(
            {
                id: customers._id,
                role: customers.Role
            },
            process.env.JWT_SECRET, 
            { expiresIn: "3h" } 
        );

        return token;
    } catch (error) {
        console.error("Error creating token:", error);
        return null; 
    }
};


export const createTokenForRestaurant = (restaurant) => {
    try {
        const token = jwt.sign(
            {
                id: restaurant._id,
                
            },
            process.env.JWT_SECRET, 
            { expiresIn: "3h" } 
        );

        return token;
    } catch (error) {
        console.error("Error creating token:", error);
        return null; 
    }
};