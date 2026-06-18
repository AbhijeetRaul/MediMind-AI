"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RegisterPage() {
  const router =
    useRouter();

  const [form, setForm] =
    useState({
      fullName: "",
      email: "",
      password: "",
      role: "ADMIN",
    });

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
          "/auth/register",
          form
        );

        toast.success(
          "Registration successful"
        );

        router.push(
          "/login"
        );
      } catch {
        toast.error(
          "Registration failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-4"
        >
          <Input
            placeholder="Full Name"
            value={
              form.fullName
            }
            onChange={(e) =>
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
            onChange={(e) =>
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
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target
                    .value,
              })
            }
          />

          <select
            className="w-full border rounded-xl p-3"
            value={
              form.role
            }
            onChange={(e) =>
              setForm({
                ...form,
                role:
                  e.target
                    .value,
              })
            }
          >
            <option>
              ADMIN
            </option>

            <option>
              DOCTOR
            </option>

            <option>
              RECEPTIONIST
            </option>

            <option>
              PATIENT
            </option>
          </select>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}