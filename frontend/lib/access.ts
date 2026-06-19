export const roleAccess = {
  ADMIN: [
    "/dashboard",
    "/dashboard/doctors",
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/medical-records",
    "/dashboard/billing",
    "/dashboard/ai-assistant",
    "/dashboard/staff",
  ],

  DOCTOR: [
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/medical-records",
    "/dashboard/ai-assistant",
  ],

  RECEPTIONIST: [
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/medical-records",
    "/dashboard/billing",
  ],

  PATIENT: [
    "/dashboard/appointments",
    "/dashboard/medical-records",
    "/dashboard/billing",
  ],
};