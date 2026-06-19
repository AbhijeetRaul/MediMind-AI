export interface CreateMedicalRecordInput {
  patientId: string;
  doctorId?: string;

  visitReason?: string;

  diagnosis: string;
  prescription?: string;

  allergies?: string;
  notes?: string;

  height?: number;
  weight?: number;
}

export interface UpdateMedicalRecordInput {
  visitReason?: string;

  diagnosis?: string;
  prescription?: string;

  allergies?: string;
  notes?: string;

  height?: number;
  weight?: number;
}