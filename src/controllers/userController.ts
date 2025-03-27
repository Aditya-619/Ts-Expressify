import { Request, Response } from "express";
import Users from "../models/users";

interface ApiResponse<T = {}> {
  status: 0 | 1;
  msg: string;
  payload: T;
}

export const createUser = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  const { name, techStack, experience } = req.body;
  if (!name || !techStack || experience === undefined) {
    res.status(400).json({
      status: 0,
      msg: "Missing required fields",
      payload: {},
    });
    return;
  }
  try {
    const newUser = await Users.create({ name, techStack, experience });
    res.status(201).json({
      status: 1,
      msg: "Success",
      payload: { newUser },
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      status: 0,
      msg: "Internal server error",
      payload: {},
    });
  }
};

export const getAllUsers = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: 1,
      msg: "Success",
      payload: { users },
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({
      status: 0,
      msg: "Internal server error",
      payload: {},
    });
  }
};

export const getUserById = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      status: 0,
      msg: "missing required* fields",
      payload: {},
    });
    return;
  }
  try {
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({
        status: 0,
        msg: "User not found",
        payload: {},
      });
      return;
    }
    res.status(200).json({
      status: 1,
      msg: "Success",
      payload: { user },
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({
      status: 0,
      msg: "Internal server error",
      payload: {},
    });
  }
};
