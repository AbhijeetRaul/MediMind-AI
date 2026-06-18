import { prisma } from "../../lib/prisma";

export const createAppointment =
  async (data: {
    doctorId: string;
    patientId: string;
    appointmentAt: string;
    notes?: string;
  }) => {
    return prisma.appointment.create({
      data: {
        doctorId: data.doctorId,
        patientId: data.patientId,
        appointmentAt: new Date(
          data.appointmentAt
        ),
        notes: data.notes,
      },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },
    });
  };

export const getAppointments =
  async () => {
    return prisma.appointment.findMany({
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },
    });
  };

  export const deleteAppointment =
  async (
    id: string
  ) => {
    return prisma.appointment.delete(
      {
        where: {
          id,
        },
      }
    );
  };

  export const updateAppointment =
  async (
    id: string,
    data: {
      appointmentAt: string;
      notes?: string;
    }
  ) => {
    return prisma.appointment.update(
      {
        where: {
          id,
        },

        data: {
          appointmentAt:
            new Date(
              data.appointmentAt
            ),

          notes:
            data.notes,
        },

        include: {
          doctor: {
            include: {
              user: true,
            },
          },

          patient: {
            include: {
              user: true,
            },
          },
        },
      }
    );
  };