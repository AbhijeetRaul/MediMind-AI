  import bcrypt from "bcryptjs";
  import { prisma } from "../../lib/prisma";

  export const createPatient =
    async (
      data: {
        fullName: string;
        email: string;
        password: string;
        age: number;
        gender: string;
        bloodGroup?: string;
        medicalHistory?: string;
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
          "Patient email already exists"
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
                "PATIENT" as const,
            },
          }
        );

      return prisma.patient.create(
        {
          data: {
            age:
              data.age,

            gender:
              data.gender,

            bloodGroup:
              data.bloodGroup,

            medicalHistory:
              data.medicalHistory,

            userId:
              user.id,
          },

          include: {
            user: true,
          },
        }
      );
    };

  export const getAllPatients =
    async () => {
      return prisma.patient.findMany(
        {
          include: {
            user: true,
          },
        }
      );
    };

    export const deletePatient =
    async (
      id: string
    ) => {
      await prisma.appointment.deleteMany(
        {
          where: {
            patientId:
              id,
          },
        }
      );

      const patient =
        await prisma.patient.findUnique(
          {
            where: {
              id,
            },
          }
        );

      if (
        !patient
      ) {
        throw new Error(
          "Patient not found"
        );
      }

      await prisma.patient.delete(
        {
          where: {
            id,
          },
        }
      );

      await prisma.user.delete(
        {
          where: {
            id:
              patient.userId,
          },
        }
      );

      return true;
    };

    export const updatePatient =
    async (
      id: string,
      data: {
        age: number;
        gender: string;
        bloodGroup?: string;
        medicalHistory?: string;
      }
    ) => {
      return prisma.patient.update(
        {
          where: {
            id,
          },

          data,
        }
      );
    };