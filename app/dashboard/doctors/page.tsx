"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Doctor {
  id: string;
  specialization: string;
  experience: number;
  user: {
    fullName: string;
    email: string;
  };
}

export default function DoctorsPage() {
  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [loading, setLoading] =
    useState(true);

 const [form, setForm] =
  useState({
    fullName: "",
    email: "",
    password: "",
    specialization:
      "",
    experience: "",
  });

  const fetchDoctors =
    async () => {
      try {
        const res =
          await api.get(
            "/doctors"
          );

        setDoctors(
          res.data
        );
      } catch {
        toast.error(
          "Failed to load doctors"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCreate =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
  "/doctors",
  {
    fullName:
      form.fullName,

    email:
      form.email,

    password:
      form.password,

    specialization:
      form.specialization,

    experience:
      Number(
        form.experience
      ),
  }
);

        toast.success(
          "Doctor added"
        );

        setForm({
  fullName: "",
  email: "",
  password: "",
  specialization:
    "",
  experience: "",
});

        fetchDoctors();
      } catch {
        toast.error(
          "Failed to create doctor"
        );
      }
    };

    const handleDelete =
  async (
    id: string
  ) => {
    console.log(
      "DELETE CLICKED",
      id
    );

    try {
      const res =
        await api.delete(
          `/doctors/${id}`
        );

      console.log(
        res.data
      );

      toast.success(
        "Doctor deleted"
      );

      fetchDoctors();
    } catch (
      error: any
    ) {
      console.log(
        error
      );

      toast.error(
        "Failed deleting doctor"
      );
    }
  };

  const handleEdit =
  async (
    doctor: Doctor
  ) => {
    const newSpec =
      prompt(
        "Specialization",
        doctor.specialization
      );

    const newExp =
      prompt(
        "Experience",
        doctor.experience.toString()
      );

    if (
      !newSpec ||
      !newExp
    )
      return;

    try {
      await api.put(
        `/doctors/${doctor.id}`,
        {
          specialization:
            newSpec,

          experience:
            Number(
              newExp
            ),
        }
      );

      toast.success(
        "Doctor updated"
      );

      fetchDoctors();
    } catch {
      toast.error(
        "Failed updating doctor"
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Doctors
          </h1>

          <p className="text-gray-500">
            Manage hospital doctors
          </p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Add Doctor
        </h2>

        <form
          onSubmit={
            handleCreate
          }
          className="grid md:grid-cols-3 gap-4"
        >
          <Input
  placeholder="Doctor Name"
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
  placeholder="Doctor Email"
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
            placeholder="Specialization"
            value={
              form.specialization
            }
            onChange={(e) =>
              setForm({
                ...form,
                specialization:
                  e.target
                    .value,
              })
            }
          />

          <Input
            placeholder="Experience"
            type="number"
            value={
              form.experience
            }
            onChange={(e) =>
              setForm({
                ...form,
                experience:
                  e.target
                    .value,
              })
            }
          />

          

          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Add Doctor
          </Button>
        </form>
      </Card>

      <Card className="p-6 rounded-3xl shadow-md bg-white overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">
          Doctors List
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
                  Specialization
                </th>
                <th>
                  Experience
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map(
                (
                  doctor
                ) => (
                  <tr
                    key={
                      doctor.id
                    }
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 font-medium">
                      {
                        doctor
                          .user
                          .fullName
                      }
                    </td>

                    <td>
                      {
                        doctor
                          .user
                          .email
                      }
                    </td>

                    <td>
                      {
                        doctor.specialization
                      }
                    </td>

                    <td>
                      {
                        doctor.experience 
                      }{" "}
                      yrs
                    </td>
                    <td>
  <td className="flex gap-2 py-4">
  <Button
    onClick={() =>
      handleEdit(
        doctor
      )
    }
    className="bg-blue-500 hover:bg-blue-600"
  >
    Edit
  </Button>

  <Button
    onClick={() =>
      handleDelete(
        doctor.id
      )
    }
    className="bg-red-500 hover:bg-red-600"
  >
    Delete
  </Button>
</td>
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