import dotenv from "dotenv";

dotenv.config()

import express, { Request, Response } from "express";
import sequelize from "./db";
import models from "./models/models";
import cors from "cors";
import router from "./routes/index";

const PORT = process.env.PORT || 5000; // Provide a fallback port

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "getRec" });
});

// Start server
const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (e) {
    console.error("Error starting the server:", e);
  }
};

start();
