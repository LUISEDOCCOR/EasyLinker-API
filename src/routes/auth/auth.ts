import { Router } from "express";
import { login, signup } from "@/controllers/auth";

export const CreateAuthRouter = () => {
  const router = Router();
  router.post("/login", login);
  router.post("/signup", signup);
  return router;
};
