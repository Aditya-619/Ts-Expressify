import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);

export default userRouter;