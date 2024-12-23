import express from "express";
import cors from "cors";
import { CreateAuthRouter } from "@/routes";

export const app = express();

app.get("/ok", (_, res) => {
  res.send("ok");
});

app.use(express.json());
app.use(cors());

app.use("/auth", CreateAuthRouter());

app.get("/ok", (_, res) => {
  res.send("ok");
});
