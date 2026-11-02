import mongoose from "mongoose";

const TutorialSchema = new mongoose.Schema({
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  content: [
    {
      heading: String,
      description: String,
      points: [String]
    }
  ]

}, { timestamps: true });

export default mongoose.model("Tutorial", TutorialSchema);