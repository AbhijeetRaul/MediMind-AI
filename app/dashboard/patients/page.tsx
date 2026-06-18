"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Patient {
  id: string;
  age: number;
  gender: string;
  bloodGroup?: string;
  medicalHistory?: string;

  user: {
    fullName: string;
    email: string;
  };
}

export default function PatientsPage() {
  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [loading, setLoading] =
    useState(true);

 const [form, setForm] =
  useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    medicalHistory:
      "",
  });

  const fetchPatients =
    async () => {
      try {
        const res =
          await api.get(
            "/patients"
          );

        setPatients(
          res.data
        );
      } catch {
        toast.error(
          "Failed to load patients"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleCreate =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
       await api.post(
  "/patients",
  {
    fullName:
      form.fullName,

    email:
      form.email,

    password:
      form.password,

    age:
      Number(
        form.age
      ),

    gender:
      form.gender,

    bloodGroup:
      form.bloodGroup,

    medicalHistory:
      form.medicalHistory,
  }
);

        toast.success(
          "Patient added"
        );

        setForm({
  fullName: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  bloodGroup: "",
  medicalHistory:
    "",
});

        fetchPatients();
      } catch {
        toast.error(
          "Failed to add patient"
        );
      }
    };

    const handleDelete =
  async (
    id: string
  ) => {
    try {
      await api.delete(
        `/patients/${id}`
      );

      toast.success(
        "Patient deleted"
      );

      fetchPatients();
    } catch {
      toast.error(
        "Failed deleting patient"
      );
    }
  };

  const handleEdit =
  async (
    patient: Patient
  ) => {
    const newAge =
      prompt(
        "Age",
        patient.age.toString()
      );

    const newGender =
      prompt(
        "Gender",
        patient.gender
      );

    const newBlood =
      prompt(
        "Blood Group",
        patient.bloodGroup
      );

    const newHistory =
      prompt(
        "Medical History",
        patient.medicalHistory
      );

    if (
      !newAge ||
      !newGender
    )
      return;

    try {
      await api.put(
        `/patients/${patient.id}`,
        {
          age:
            Number(
              newAge
            ),

          gender:
            newGender,

          bloodGroup:
            newBlood,

          medicalHistory:
            newHistory,
        }
      );

      toast.success(
        "Patient updated"
      );

      fetchPatients();
    } catch {
      toast.error(
        "Failed updating patient"
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Patients
        </h1>

        <p className="text-gray-500">
          Manage patient records
        </p>
      </div>

      <Card className="p-6 rounded-3xl shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Add Patient
        </h2>

        <form
          onSubmit={
            handleCreate
          }
          className="grid md:grid-cols-3 gap-4"
        >
          <Input
  placeholder="Patient Name"
  value={
    form.fullName
  }
  onChange={(e) =>
    setForm({
      ...form,
      fullName:
        e.target.value,
    })
  }
/>

<Input
  placeholder="Patient Email"
  type="email"
  value={
    form.email
  }
  onChange={(e) =>
    setForm({
      ...form,
      email:
        e.target.value,
    })
  }
/>

<Input
  placeholder="Password"
  type="password"
  value={
    form.password
  }
  onChange={(e) =>
    setForm({
      ...form,
      password:
        e.target.value,
    })
  }
/>
          <Input
            placeholder="Age"
            type="number"
            value={
              form.age
            }
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target
                  .value,
              })
            }
          />

          <Input
            placeholder="Gender"
            value={
              form.gender
            }
            onChange={(e) =>
              setForm({
                ...form,
                gender:
                  e.target
                    .value,
              })
            }
          />

          <Input
            placeholder="Blood Group"
            value={
              form.bloodGroup
            }
            onChange={(e) =>
              setForm({
                ...form,
                bloodGroup:
                  e.target
                    .value,
              })
            }
          />

          <Input
            placeholder="Medical History"
            value={
              form.medicalHistory
            }
            onChange={(e) =>
              setForm({
                ...form,
                medicalHistory:
                  e.target
                    .value,
              })
            }
          />


          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Add Patient
          </Button>
        </form>
      </Card>

      <Card className="p-6 rounded-3xl shadow-md bg-white overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">
          Patient List
        </h2>

        {loading ? (
          <p>
            Loading...
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-3">
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Age
                </th>
                <th>
                  Gender
                </th>
                <th>
                  Blood Group
                </th>
                <th>
                  History
                </th>
                <th>
  Action
</th>
              </tr>
            </thead>

            <tbody>
              {patients.map(
                (
                  patient
                ) => (
                  <tr
                    key={
                      patient.id
                    }
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 font-medium">
                      {
                        patient
                          .user
                          .fullName
                      }
                    </td>

                    <td>
                      {
                        patient
                          .user
                          .email
                      }
                    </td>

                    <td>
                      {
                        patient.age
                      }
                    </td>

                    <td>
                      {
                        patient.gender
                      }
                    </td>

                    <td>
                      {
                        patient.bloodGroup
                      }
                    </td>

                    <td>
                      {
                        patient.medicalHistory
                      }
                    </td>
                    <td className=" flex gap-2 py-4">
                      <Button
                        onClick={() =>
                          handleEdit(
                            patient
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() =>
                          handleDelete(
                            patient.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}