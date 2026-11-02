import authModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        if(!name || !email || !password) {
            return res.status(400).send({
                message: "plz enter all fields"
            });
        }

        const existingUser = await authModel.findOne({email});

        if(existingUser) {
            return res.status(400).send({
                success: false,
                message: "email is already exist"
            });
        }
        const users = await authModel({
            name,
            email,
            password:hashedPassword
        }).save();

        return res.status(201).send({
            success: true,
            message: "user register successfully",
            users
        })
    } catch(error) {
        return res.status(500).send({
            success: false,
            message: "error while register"
        })
    }
};

// loggin controller

export const logginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        console.log("email", req.body.email);
        console.log("password", req.body.password);

        if(!email || !password) {
            return res.status(401).send({
                success:false,
                message: "Invalid eamil or password"
            });
        }

        const userlogin = await authModel.findOne({email});

        const matchPassword = await bcrypt.compare(password,userlogin.password);

        const token = JWT.sign(
            {_id: userlogin._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        console.log("TOKEN:",token);

        return res.status(201).send({
            success: true,
            message: "user login successfully",
            userlogin,
            token
        });
    } catch(error) {
        return res.status(400).send({
            success: false,
            message: "error while login"
        });
    }
}


// get profile 

export const getProfileController = async (req, res) => {
    try {
        // const {id} = req.params;
        // const userProfile = await authModel.findOne({id});

        const userProfile = await authModel.findById(req.user._id);

        return res.status(200).send({
            success: true,
            message: "here the details",
            userProfile
        });
    } catch(error) {
        return res.status(401).send({
            success: false,
            message: "error while getting user details"
        });
    }
};