import JWT from "jsonwebtoken"
import AuthModel from "../models/userModel.js";

export const authMiddleware = (req, res, next) => {
    try {
        
       const token = req.headers.authorization;

       console.log(req.headers.authorization);
       console.log(token);
       const decoded = JWT.verify(
           token,
           process.env.JWT_SECRET
       );
        req.user = decoded;

        next();

    } catch(error) {
        return res.status(401).send({
            success: false,
            message: "invalid or expired token"
        });
    }
};


export const isAdmin = async (req, res, next) => {

    try {
        const user = await AuthModel.findById(req.user._id);

        if(user.__v !== 1) {
            return res.status(400).send({
              success: false,
              message: "unAuthorized Access"
            });
        } else {
            next();
        }
    } catch(error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "error in Admin Middleware",
            error
        });
    }
};