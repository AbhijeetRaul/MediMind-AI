export const permissions =
{
  ADMIN: [
    "/dashboard",
    "/dashboard/doctors",
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/billing",
  ],

  DOCTOR: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/patients",
  ],

  RECEPTIONIST: [
    "/dashboard",
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/billing",
  ],

  PATIENT: [
    "/dashboard",
  ],
};