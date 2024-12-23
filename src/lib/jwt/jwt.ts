import * as jwt from "jsonwebtoken";

export const createToken = (id: number) => {
  const secretkey = process.env.JWT_KEY || "";
  const token = jwt.sign({ id }, secretkey, { expiresIn: "30d" });
  return token;
};
