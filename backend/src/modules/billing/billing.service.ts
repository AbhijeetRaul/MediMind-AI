import { prisma } from "../../lib/prisma";

export const createBill =
  async (
    data: {
      consultationFee:
        number;

      medicineCost:
        number;

      labCost:
        number;

      roomCharge:
        number;

      discount:
        number;

      amount:
        number;

      paymentMethod?:
        string;

      patientId:
        string;

      appointmentId:
        string;
    }
  ) => {
    return prisma.bill.create(
      {
        data: {
          consultationFee:
            data.consultationFee,

          medicineCost:
            data.medicineCost,

          labCost:
            data.labCost,

          roomCharge:
            data.roomCharge,

          discount:
            data.discount,

          amount:
            data.amount,

          paymentMethod:
            data.paymentMethod,

          patientId:
            data.patientId,

          appointmentId:
            data.appointmentId,
        },

        include: {
          patient: {
            include: {
              user:
                true,
            },
          },

          appointment:
            true,
        },
      }
    );
  };

export const createTransaction =
  async (data: {
    billId: string;
    amount: number;
    method: string;
    reference?: string;
  }) => {
    const transaction =
  await prisma.transaction.create(
    {
      data,

      include: {
        bill:
          true,
      },
    }
  );

await prisma.bill.update(
  {
    where: {
      id:
        data.billId,
    },

    data: {
      status:
        "PAID",
    },
  }
);

return transaction;
  };

export const getBills =
  async () => {
    return prisma.bill.findMany({
      include: {
        patient: {
          include: {
            user: true,
          },
        },

        appointment: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },

        transaction:
          true,
      },
    });
  };