import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT" | "RECEPTIONIST";
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  const token = generateToken(user.id, user.role);

  return {
    token,
    user,
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id, user.role);

  return {
    token,
    user,
  };
};