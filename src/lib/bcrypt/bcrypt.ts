import bcrypt from "bcrypt";

export const checkPassword = async ({
  hash,
  password,
}: {
  hash: string;
  password: string;
}) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
