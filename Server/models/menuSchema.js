import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    menu_id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    menu_icon: {
        data: Buffer,
        contentType: String
    },
    slug: {
        type: String,
        required: true
    }
},{timestamps: true});

const CounterSchema = new mongoose.Schema({
    id: {
        type: String
    },
    seq: {
        type: Number
    }
})

const MenuModel =  mongoose.model("Menu", MenuSchema);
const CounterModel =  mongoose.model("Counter", CounterSchema);


export {MenuModel, CounterModel};