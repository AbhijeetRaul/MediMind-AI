import { prisma } from "../../lib/prisma";

import {
  CreateMedicalRecordInput,
  UpdateMedicalRecordInput,
} from "./medical-record.types";

export const createMedicalRecord =
  async (
    data: CreateMedicalRecordInput
  ) => {
    return prisma.medicalRecord.create({
      data,

      include: {
        patient: {
          include: {
            user: true,
          },
        },

        doctor: {
          include: {
            user: true,
          },
        },
      },
    });
  };

export const getAllMedicalRecords =
  async () => {
    return prisma.medicalRecord.findMany({
      include: {
        patient: {
          include: {
            user: true,
          },
        },

        doctor: {
          include: {
            user: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const getPatientMedicalRecords =
  async (
    patientId: string
  ) => {
    return prisma.medicalRecord.findMany({
      where: {
        patientId,
      },

      include: {
        doctor: {
          include: {
            user: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const updateMedicalRecord =
  async (
    id: string,
    data: UpdateMedicalRecordInput
  ) => {
    return prisma.medicalRecord.update({
      where: {
        id,
      },

      data,
    });
  };

export const deleteMedicalRecord =
  async (
    id: string
  ) => {
    return prisma.medicalRecord.delete({
      where: {
        id,
      },
    });
  };