import { Request, Response } from "express";
import { Task } from "../types/task";

// in-memory storage
const tasks: Task[] = [];

export const getTasks = (req: Request, res: Response) => {
  try {
    console.log("Fetching tasks");
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch tasks" });
  }
};

export const createTask = (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "pending",
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};
