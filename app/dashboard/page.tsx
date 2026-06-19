"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Stethoscope,
  Users,
  IndianRupee,
  Calendar,
} from "lucide-react";

import {
  Card,
} from "@/components/ui/card";

import {
  api,
} from "@/lib/axios";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Stats {
  doctors: number;
  patients: number;
  revenue: number;
  appointments: number;
}



export default function DashboardPage() {
  const [stats, setStats] =
    useState<Stats>({
      doctors: 0,
      patients: 0,
      revenue: 0,
      appointments: 0,
    });

  const [loading, setLoading] =
    useState(true);

    const [
  appointmentChartData,
  setAppointmentChartData,
] = useState<
  {
    month: string;
    appointments:
      number;
  }[]
>([]);

const [
  revenueChartData,
  setRevenueChartData,
] = useState<
  {
    month: string;
    revenue:
      number;
  }[]
>([]);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const [
            doctorsRes,
            patientsRes,
            billingRes,
            appointmentsRes,
          ] = await Promise.all([
            api.get("/doctors"),
            api.get("/patients"),
            api.get("/billing"),
            api.get(
              "/appointments"
            ),
          ]);

          const revenue =
            billingRes.data.reduce(
              (
                sum: number,
                bill: any
              ) =>
                sum +
                (bill.transaction
                  ?.amount || 0),
              0
            );
            const monthlyData =
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map(
    (
      month,
      index
    ) => {
      const count =
        appointmentsRes.data.filter(
          (
            appointment:
              any
          ) => {
            const date =
              new Date(
                appointment.appointmentAt
              );

            return (
              date.getMonth() ===
              index
            );
          }
        ).length;

      return {
        month,
        appointments:
          count,
      };
    }
  );

setAppointmentChartData(
  monthlyData
);

          setStats({
            doctors:
              doctorsRes.data
                .length,

            patients:
              patientsRes.data
                .length,

            appointments:
              appointmentsRes.data
                .length,

            revenue,
          });
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Doctors",
      value:
        stats.doctors,
      icon:
        Stethoscope,
    },
    {
      title: "Patients",
      value:
        stats.patients,
      icon: Users,
    },
    {
      title:
        "Appointments",
      value:
        stats.appointments,
      icon: Calendar,
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon:
        IndianRupee,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Hospital analytics &
          performance overview
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(
          (
            card,
            index
          ) => {
            const Icon =
              card.icon;

            return (
              <Card
                key={index}
                className="rounded-[2rem] border-none shadow-md bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">
                      {
                        card.title
                      }
                    </p>

                    <h2 className="text-4xl font-bold text-gray-800 mt-3">
                      {loading
                        ? "..."
                        : card.value}
                    </h2>
                  </div>

                  <div className="bg-emerald-100 p-4 rounded-2xl">
                    <Icon className="text-emerald-700" />
                  </div>
                </div>
              </Card>
            );
          }
        )}
      </div>

      {/* CHART */}
      <div className="grid lg:grid-cols-2 gap-6">

  {/* Appointment Chart */}
  <Card className="rounded-[2rem] bg-white p-6 shadow-md border-none">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-800">
        Appointment Analytics
      </h2>

      <p className="text-sm text-gray-500">
        Monthly appointment trends
      </p>
    </div>

    <div className="h-[350px] w-full">
  <ResponsiveContainer
    width="100%"
    height="100%"
  >
        <AreaChart
          data={
            appointmentChartData
          }
        >
          <XAxis
  dataKey="month"
  axisLine={false}
  tickLine={false}
/>

          <Tooltip
  contentStyle={{
    borderRadius:
      "16px",
    border:
      "none",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  }}
/>

          <Area
            type="natural"
            dataKey="appointments"
            stroke="#059669"
            fillOpacity={0.25}
fill="#10B981"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>

  {/* Revenue Chart */}
  <Card className="rounded-[2rem] bg-white p-6 shadow-md border-none">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-800">
        Revenue Analytics
      </h2>

      <p className="text-sm text-gray-500">
        Monthly paid revenue
      </p>
    </div>

    <div className="h-55">
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart
          data={
            revenueChartData
          }

        >
          <CartesianGrid
  strokeDasharray="3 3"
  vertical={false}
/>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
 formatter={(value) => [
  `₹${Number(value ?? 0)}`,
  "Revenue",
]}
  contentStyle={{
    borderRadius:
      "16px",
    border:
      "none",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  }}
/>

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            fillOpacity={0.25}
fill="#2563EB"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>

</div>
    </div>
  );
}