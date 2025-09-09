import { Router } from "express";
const router = Router();
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
