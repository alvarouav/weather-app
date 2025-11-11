import CalculateTemperaturesAverageGetController from "@/controllers/temperatures/calculateTemperaturesAverageGetController";
import type { Request, Response } from "express";
// eslint-disable-next-line no-duplicate-imports
import express from "express";
import cors from "cors";


const app = express(),
  PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world>!" });
});

app.get("/temperatures/calculateAvg", async (req: Request, res: Response) => {
  await CalculateTemperaturesAverageGetController.handle(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
