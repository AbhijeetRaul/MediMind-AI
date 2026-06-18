export const roleAccess =
{
  ADMIN: [
    "/dashboard",
    "/dashboard/doctors",
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/billing",
    "/dashboard/ai-assistant",
    "/dashboard/staff",
  ],

  DOCTOR: [
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/ai-assistant",
  ],

  RECEPTIONIST: [
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/billing",
  ],

  PATIENT: [
    "/dashboard/appointments",
    "/dashboard/billing",
  ],
};