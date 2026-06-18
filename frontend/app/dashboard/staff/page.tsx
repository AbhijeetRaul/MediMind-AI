"use client";

import {
  useEffect,
  useState,
} from "react";

import { api }
from "@/lib/axios";

import {
  Card,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import { toast }
from "sonner";



interface Staff {
  id: string;

  fullName:
    string;

  email:
    string;

  role:
    string;
}

export default function
StaffPage() {
  const [staff,
    setStaff] =
    useState<
      Staff[]
    >([]);

    const [authorized,
  setAuthorized] =
  useState(false);
  

  const [form,
    setForm] =
    useState({
      fullName:
        "",

      email:
        "",

      password:
        "",
    });

  const fetchStaff =
    async () => {
      try {
        const res =
          await api.get(
            "/staff"
          );

        setStaff(
          res.data
        );
      } catch {
        toast.error(
          "Failed loading staff"
        );
      }
    };

  useEffect(() => {
    const checkAdmin =
  async () => {
    try {
      const res =
        await api.get(
          "/auth/profile"
        );

      if (
        res.data.role !==
        "ADMIN"
      ) {
        window.location.href =
          "/dashboard";

        return;
      }

      setAuthorized(
        true
      );

      fetchStaff();
    } catch {
      window.location.href =
        "/login";
    }
  };

checkAdmin();
  }, []);

  const handleCreate =
    async (
      e:
        React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
          "/staff",
          form
        );

        toast.success(
          "Receptionist added"
        );

        setForm({
          fullName:
            "",

          email:
            "",

          password:
            "",
        });

        fetchStaff();
      } catch {
        toast.error(
          "Failed creating staff"
        );
      }
    };

  const handleDelete =
    async (
      id:
        string
    ) => {
      try {
        await api.delete(
          `/staff/${id}`
        );

        toast.success(
          "Staff removed"
        );

        fetchStaff();
      } catch {
        toast.error(
          "Failed deleting staff"
        );
      }
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Staff
          Management
        </h1>

        <p className="text-gray-500">
          Manage
          hospital
          staff
        </p>
      </div>

      <Card className="bg-white p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Add
          Receptionist
        </h2>

        <form
          onSubmit={
            handleCreate
          }
          className="grid md:grid-cols-2 gap-4"
        >
          <Input
            placeholder="Full Name"
            value={
              form.fullName
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                fullName:
                  e.target
                    .value,
              })
            }
          />

          <Input
            placeholder="Email"
            type="email"
            value={
              form.email
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                email:
                  e.target
                    .value,
              })
            }
          />

          <Input
            placeholder="Password"
            type="password"
            value={
              form.password
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                password:
                  e.target
                    .value,
              })
            }
          />

          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Add
            Receptionist
          </Button>
        </form>
      </Card>

      <Card className="bg-white p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Staff List
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th>
                Name
              </th>

              <th>
                Email
              </th>

              <th>
                Role
              </th>

              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {staff.map(
              (
                member
              ) => (
                <tr
                  key={
                    member.id
                  }
                  className="border-b"
                >
                  <td className="py-4">
                    {
                      member.fullName
                    }
                  </td>

                  <td>
                    {
                      member.email
                    }
                  </td>

                  <td>
                    {
                      member.role
                    }
                  </td>

                  <td>
                    <Button
                      onClick={() =>
                        handleDelete(
                          member.id
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
      </Card>
    </div>
  );
}