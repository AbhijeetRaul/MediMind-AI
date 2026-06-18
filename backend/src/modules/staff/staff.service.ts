import bcrypt
from "bcryptjs";

import {
  prisma,
} from "../../lib/prisma";

export const
createReceptionist =
async (
  data: {
    fullName:
      string;

    email:
      string;

    password:
      string;
  }
) => {
  const existingUser =
    await prisma.user.findUnique(
      {
        where: {
          email:
            data.email,
        },
      }
    );

  if (
    existingUser
  ) {
    throw new Error(
      "Receptionist already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  return prisma.user.create(
    {
      data: {
        fullName:
          data.fullName,

        email:
          data.email,

        password:
          hashedPassword,

        role:
          "RECEPTIONIST",
      },
    }
  );
};

export const
getReceptionists =
async () => {
  return prisma.user.findMany(
    {
      where: {
        role:
          "RECEPTIONIST",
      },

      select: {
        id:
          true,

        fullName:
          true,

        email:
          true,

        role:
          true,
      },
    }
  );
};

export const
deleteReceptionist =
async (
  id: string
) => {
  return prisma.user.delete(
    {
      where: {
        id,
      },
    }
  );
};