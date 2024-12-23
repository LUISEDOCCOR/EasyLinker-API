import { Request, Response } from "express";
import { getUserByEmail, createUser } from "@/models/auth";
import { checkPassword, hashPassword, createToken } from "@/lib";
import { createResponse } from "@/utils";

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    createResponse(res, {
      msg: "No data is being sent",
      code: 400,
    });
    return;
  }

  if (email.trim().length < 5 || password.trim().length < 8) {
    createResponse(res, {
      msg: "The data is composed of spaces and its length is very short",
      code: 400,
    });
    return;
  }

  const user = await getUserByEmail({ email });

  if (!user) {
    createResponse(res, {
      msg: "The email is not registered",
      code: 400,
    });
    return;
  }

  if (!(await checkPassword({ hash: user.password, password }))) {
    createResponse(res, {
      msg: "The password is incorrect",
      code: 400,
    });
    return;
  }

  res.json({ email: user.email, token: createToken(user.id) });
};

export const signup = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    createResponse(res, {
      msg: "No data is being sent",
      code: 400,
    });
    return;
  }

  if (email.trim().length < 5 || password.trim().length < 8) {
    createResponse(res, {
      msg: "The data is composed of spaces and its length is very short",
      code: 400,
    });
    return;
  }

  const user = await getUserByEmail({ email });

  if (user) {
    createResponse(res, {
      msg: "The email is registered",
      code: 400,
    });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const userCreated = await createUser({ email, password: hashedPassword });

  res.json({ email: userCreated.email, token: createToken(userCreated.id) });
};
