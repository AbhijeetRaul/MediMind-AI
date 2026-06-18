"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface User {
  role: string;
  email: string;
}

interface Doctor {
  id: string;
  user: {
    fullName: string;
  };
}

interface Patient {
  id: string;
  user: {
    fullName: string;
  };
}

interface Appointment {
  id: string;
  appointmentAt: string;
  notes?: string;

  doctor: {
    user: {
      fullName: string;
    };
  };

  patient: {
    user: {
      fullName: string;
    };
  };
}

export default function AppointmentsPage() {
  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [user,setUser] =
  useState<User | null>(
    null
  );

  const [search,
  setSearch] =
  useState("");

  const [
  selectedHour,
  setSelectedHour,
] = useState("");

const [
  selectedSlot,
  setSelectedSlot,
] = useState("");

  const [form, setForm] =
    useState({
      doctorId: "",
      patientId: "",
      appointmentAt: "",
      notes: "",
    });

  const fetchData =
    async () => {
      try {
        const [
  doctorsRes,
  patientsRes,
  appointmentsRes,
  profileRes,
] = await Promise.all([
  api.get("/doctors"),
  api.get("/patients"),
  api.get("/appointments"),
  api.get(
    "/auth/profile"
  ),
]);     
        setUser(
          profileRes.data
        );

        setDoctors(
          doctorsRes.data
        );

        setPatients(
          patientsRes.data
        );

        let filteredAppointments =
  appointmentsRes.data;

const role =
  profileRes.data.role;

const email =
  profileRes.data.email;

// PATIENT
if (
  role ===
  "PATIENT"
) {
  filteredAppointments =
    appointmentsRes.data.filter(
      (
        appointment:
          any
      ) =>
        appointment
          .patient
          ?.user
          ?.email ===
        email
    );
}

// DOCTOR
if (
  role ===
  "DOCTOR"
) {
  filteredAppointments =
    appointmentsRes.data.filter(
      (
        appointment:
          any
      ) =>
        appointment
          .doctor
          ?.user
          ?.email ===
        email
    );
}

setAppointments(
  filteredAppointments
);
      } catch {
        toast.error(
          "Failed loading data"
        );
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
          "/appointments",
          form
        );

        toast.success(
          "Appointment created"
        );

        setForm({
          doctorId: "",
          patientId: "",
          appointmentAt:
            "",
          notes: "",
        });

        fetchData();
      } catch {
        toast.error(
          "Failed creating appointment"
        );
      }
    };

    const handleDelete =
  async (
    id: string
  ) => {
    try {
      await api.delete(
        `/appointments/${id}`
      );

      toast.success(
        "Appointment deleted"
      );

      fetchData();
    } catch {
      toast.error(
        "Failed deleting appointment"
      );
    }
  };

  const handleEdit =
  async (
    appointment:
      Appointment
  ) => {
    const newDate =
      prompt(
        "Appointment Date",
        appointment.appointmentAt.slice(
          0,
          16
        )
      );

    const newNotes =
      prompt(
        "Notes",
        appointment.notes
      );

    if (
      !newDate
    )
      return;

    try {
      await api.put(
        `/appointments/${appointment.id}`,
        {
          appointmentAt:
            newDate,

          notes:
            newNotes,
        }
      );

      toast.success(
        "Appointment updated"
      );

      fetchData();
    } catch {
      toast.error(
        "Failed updating appointment"
      );
    }
  };

  const hourBlocks = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
];

const generateSlots =
  (
    hourBlock:
      string
  ) => {
    const startHour =
      Number(
        hourBlock.split(
          ":"
        )[0]
      );

    const slots =
      [];

    for (
      let min = 0;
      min < 60;
      min += 15
    ) {
      const hour =
        startHour
          .toString()
          .padStart(
            2,
            "0"
          );

      const minute =
        min
          .toString()
          .padStart(
            2,
            "0"
          );

      slots.push(
        `${hour}:${minute}`
      );
    }

    return slots;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Appointments
        </h1>

        <p className="text-gray-500">
          Manage patient appointments
        </p>
      </div>

      
      <Card className="bg-white p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Book Appointment
        </h2>

        <form
          onSubmit={
            handleCreate
          }
          className="grid md:grid-cols-2 gap-4"
        >
          <select
            className="border rounded-xl p-3"
            value={
              form.doctorId
            }
            onChange={(e) =>
              setForm({
                ...form,
                doctorId:
                  e.target
                    .value,
              })
            }
          >
            <option value="">
              Select Doctor
            </option>

            {doctors.map(
              (doctor) => (
                <option
                  key={
                    doctor.id
                  }
                  value={
                    doctor.id
                  }
                >
                  {
                    doctor
                      .user
                      .fullName
                  }
                </option>
              )
            )}
          </select>

          <select
            className="border rounded-xl p-3"
            value={
              form.patientId
            }
            onChange={(e) =>
              setForm({
                ...form,
                patientId:
                  e.target
                    .value,
              })
            }
          >
            <option value="">
              Select Patient
            </option>

            {patients.map(
              (
                patient
              ) => (
                <option
                  key={
                    patient.id
                  }
                  value={
                    patient.id
                  }
                >
                  {
                    patient
                      .user
                      .fullName
                  }
                </option>
              )
            )}
          </select>

          <div className="md:col-span-2 space-y-4">
  <h3 className="font-semibold text-gray-700">
    Select Time Slot
  </h3>

  {/* HOUR BLOCKS */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {hourBlocks.map(
      (
        hour
      ) => {
        const isLunch =
          hour ===
          "13:00-14:00";

        return (
          <button
            type="button"
            key={
              hour
            }
            disabled={
              isLunch
            }
            onClick={() =>
              setSelectedHour(
                hour
              )
            }
            className={`rounded-2xl p-4 border transition ${
              isLunch
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : selectedHour ===
                  hour
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white hover:border-emerald-500"
            }`}
          >
            <p className="font-semibold">
              {hour}
            </p>

            {isLunch && (
              <p className="text-xs">
                Lunch
                Break
              </p>
            )}
          </button>
        );
      }
    )}
  </div>

  {/* SUB SLOTS */}
  {selectedHour && (
    <div className="space-y-2">
      <h4 className="font-medium text-gray-700">
        Available Slots
      </h4>

      <div className="grid grid-cols-4 gap-3">
        {generateSlots(
          selectedHour
        ).map(
          (
            slot
          ) => (
            <button
              key={
                slot
              }
              type="button"
              onClick={() => {
                setSelectedSlot(
                  slot
                );

                setForm({
                  ...form,
                  appointmentAt:
                    slot,
                });
              }}
              className={`rounded-xl p-3 border transition ${
                selectedSlot ===
                slot
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white hover:border-emerald-500"
              }`}
            >
              {slot}
            </button>
          )
        )}
      </div>
    </div>
  )}
</div>

          <Input
            placeholder="Notes"
            value={
              form.notes
            }
            onChange={(e) =>
              setForm({
                ...form,
                notes:
                  e.target
                    .value,
              })
            }
          />

          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Book Appointment
          </Button>
        </form>
      </Card>

      
      
      {user?.role !==
  "PATIENT" && (
    
<Card className="bg-white p-6 rounded-3xl shadow-md">
      
        <div className="flex items-center justify-between mb-6">
  <h2 className="text-xl font-semibold">
    Appointment List
  </h2>

  <Input
    placeholder="Search patient or doctor..."
    className="w-80 rounded-2xl"
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
  />
</div>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">
                Doctor
              </th>

              <th>
                Patient
              </th>

              <th>
                Date
              </th>

              <th>
                Notes
              </th>
              {user?.role !==
  "PATIENT" && (
<th>
  Action
</th>
)}
            </tr>
          </thead>

          <tbody>
  {appointments
    .filter(
      (
        appointment
      ) =>
        appointment.patient.user.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        appointment.doctor.user.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    )
    .map(
      (
        appointment
      ) => (
        <tr key={appointment.id} className="border-b hover:bg-gray-50">
          <td className="py-3">{appointment.doctor.user.fullName}</td>
          <td>{appointment.patient.user.fullName}</td>
          <td>{new Date(appointment.appointmentAt).toLocaleString()}</td>
          <td>{appointment.notes || "-"}</td>
          {user?.role !== "PATIENT" && (
            <td className="space-x-2">
              <Button onClick={() => handleEdit(appointment)} size="sm" variant="outline">Edit</Button>
              <Button onClick={() => handleDelete(appointment.id)} size="sm" variant="destructive">Delete</Button>
            </td>
          )}
        </tr>
      )
    )}
          </tbody>
        </table>
      </Card>
)}
    </div>
  );
}