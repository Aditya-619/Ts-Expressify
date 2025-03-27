import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db";
import userRouter from "./routes/userRoutes";
dotenv.config();

const app = express();

connectDB();

app.use(express.json()); 
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
    res.send("Hola!");
});

app.listen(process.env.PORT, () => {
    console.log(`server running`);
});