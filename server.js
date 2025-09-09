import express, { json } from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 5000;

app.use(json());

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Task Manager API running at http://localhost:${PORT}`);
});
