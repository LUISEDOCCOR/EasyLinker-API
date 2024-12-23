import { prisma, User } from "@/prisma";
type createUserType = Omit<User, "id">;

export const getUserByEmail = async ({ email }: { email: string }) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async (data: createUserType) => {
  return await prisma.user.create({
    data,
  });
};
