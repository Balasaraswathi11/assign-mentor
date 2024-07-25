import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import mentorRouter from "./Routers/mentor.router.js";
import studentrouter from "./Routers/student.router.js"

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("App is working successfully");
});

app.use("/api/mentor", mentorRouter);
app.use("/api/student", studentrouter)
connectDB()
const PORT = process.env.port 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
