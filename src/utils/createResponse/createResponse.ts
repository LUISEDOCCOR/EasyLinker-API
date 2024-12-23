import { Response } from "express";
export const createResponse = (
  res: Response,
  { code, msg }: { code: number; msg: string },
) => {
  return res.status(code).json({ msg });
};
