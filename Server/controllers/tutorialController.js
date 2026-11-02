import tutorialSchema from "../models/tutorialSchema.js";
import { MenuModel } from "../models/menuSchema.js";
import slugify from "slugify";

export const tutorialController = async (req, res) => {
    try {
        

        const { menu_id, title, content} = req.body;

        if(!menu_id || !title || !content ) {
            return res.status(400).send({
                success:false,
                message: "plz enter All fields"
            })
        }

        const menu = await MenuModel.findById(menu_id);

        if (!menu) {
        return res.status(404).send({
            success: false,
            message: "Menu not found"
        });
        }

        const tutorial = await tutorialSchema({
            menu_id,
            title,
            content,
            slug: slugify(title,{ lower: true })
        }).save();

        return res.status(201).send({
            success: true,
            message: "tutorial created successfully",
            tutorial
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in creating tutorial",
            error: error.message
        });
    }
};