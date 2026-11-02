import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import MenuRoute from  "./routers/menuRoute.js"
import TutorialRoute from "./routers/tutorialRoute.js"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

dotenv.config({path: "./config.env"});

connectDB();

app.get("/", (req,res) => {
    res.send("hello from server")
});

app.use("/api/v1/menu", MenuRoute);

app.use("/api/v1/tutorial", TutorialRoute);


const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});