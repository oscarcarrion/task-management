import { Router, Request, Response } from "express";
import { getTasks, createTask } from "../controllers/taskController";

const router = Router();

router.get("/", getTasks as (req: Request, res: Response) => void);
router.post("/", createTask as (req: Request, res: Response) => void);

export default router;
