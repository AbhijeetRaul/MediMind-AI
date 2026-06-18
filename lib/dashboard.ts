import { api } from "./axios";

export const getDashboardData =
  async () => {
    const [
      doctors,
      patients,
      bills,
    ] = await Promise.all([
      api.get("/doctors"),
      api.get("/patients"),
      api.get("/billing"),
    ]);

    const revenue =
      bills.data.reduce(
        (
          sum: number,
          bill: any
        ) =>
          sum +
          (bill.transaction
            ?.amount || 0),
        0
      );

    return {
      doctors:
        doctors.data.length,
      patients:
        patients.data.length,
      revenue,
    };
  };