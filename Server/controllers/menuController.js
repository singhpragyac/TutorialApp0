import {MenuModel, CounterModel} from "../models/menuSchema.js";
import slugify from "slugify";

export const menuController = async (req, res) => {
    try {
        const counter = await CounterModel.findOneAndUpdate(
            {id: "autoval"},
            {"$inc": {"seq":1}},
            {returnDocument: "after"}
        );
        
        let seqId;

        if(!counter) {
            const newCounter = await new CounterModel({
                id: "autoval",
                seq: 1
            }).save();
            seqId = newCounter.seq;
        } else {
            seqId = counter.seq;
        }


        const {title} = req.fields;
        const { menu_icon } = req.files;

        switch(true) {
            case !title:
            return res.status(500).send({ 
                error: "plz enter title" 
            });

            case menu_icon && menu_icon.size > 1000000:
            return res.status(500).send({
                error: "photo is required and should be less than 1MB" 
            });
        }
    

        const existingMenu = await MenuModel.findOne({title});

        if(existingMenu) {
            return res.status(400).send({
                success:false,
                message: "menu is already exist"
            })
        }

        const Menu = await MenuModel({
            menu_id: seqId,
            title,
            slug: slugify(title)
        })

        if (menu_icon) {
            Menu.menu_icon.data = fs.readFileSync(menu_icon.path);
            Menu.menu_icon.contentType = menu_icon.type;
        }

        await Menu.save();

        return res.status(201).send({
            success: true,
            message: "menu created successfully",
            Menu
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in creating Menu",
            error: error.message
        });
    }
};

export const getAllMenuController = async (req, res) => {
    try {
        // const {title} = req.params;

        const menu = await MenuModel.find();

        return res.status(201).send({
            success: true,
            message: "here,s all menu",
            menu        
        })
    } catch(error) {
        return res.status(500).send({
            success: false,
            message: "Error in fetching all Menu",
            error: error.message
        });
    }
};