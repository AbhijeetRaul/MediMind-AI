"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";

export default function LoginForm() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        document.cookie =
          `token=${res.data.token}; path=/; max-age=${
            60 * 60 * 24 * 7
          }`;

        toast.success(
          "Welcome back 👋"
        );

        router.push(
          "/dashboard"
        );
      } catch (error: any) {
        toast.error(
          error.response?.data
            ?.message ||
            "Invalid credentials"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-5"
    >
      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Email Address
        </label>

        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Password
        </label>

        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg"
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Secure access powered by
        MediMind AI
      </p>
    </form>
  );
}