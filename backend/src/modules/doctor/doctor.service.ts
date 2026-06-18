import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export const createDoctor =
  async (
    data: {
      fullName: string;
      email: string;
      password: string;
      specialization: string;
      experience: number;
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
        "Doctor email already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const user =
      await prisma.user.create(
        {
          data: {
            fullName:
              data.fullName,

            email:
              data.email,

            password:
              hashedPassword,

            role:
              "DOCTOR",
          },
        }
      );

    return prisma.doctor.create(
      {
        data: {
          specialization:
            data.specialization,

          experience:
            data.experience,

          userId:
            user.id,
        },

        include: {
          user: true,
        },
      }
    );
  };

export const getAllDoctors =
  async () => {
    return prisma.doctor.findMany(
      {
        include: {
          user: true,
        },
      }
    );
  };

 export const deleteDoctor =
  async (
    id: string
  ) => {
    console.log(
      "DELETE SERVICE HIT",
      id
    );

    await prisma.appointment.deleteMany(
      {
        where: {
          doctorId: id,
        },
      }
    );

    const doctor =
      await prisma.doctor.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (
      !doctor
    ) {
      throw new Error(
        "Doctor not found"
      );
    }

    await prisma.doctor.delete(
      {
        where: {
          id,
        },
      }
    );

    console.log(
      "Doctor deleted"
    );

    await prisma.user.delete(
      {
        where: {
          id:
            doctor.userId,
        },
      }
    );

    console.log(
      "User deleted"
    );

    return true;
  };

  export const updateDoctor =
  async (
    id: string,
    data: {
      specialization: string;
      experience: number;
    }
  ) => {
    return prisma.doctor.update(
      {
        where: {
          id,
        },

        data,
      }
    );
  };