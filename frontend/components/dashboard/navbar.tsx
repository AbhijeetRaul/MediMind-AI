"use client";

import {
  useEffect,
  useState,
} from "react";

import { api } from "@/lib/axios";

interface User {
  fullName: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] =
    useState<User | null>(
      null
    );

  useEffect(() => {
    const loadUser =
      async () => {
        try {
          const res =
            await api.get(
              "/auth/profile"
            );

          setUser(
            res.data
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        }
      };

    loadUser();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            {user
              ?.fullName ||
              "Loading..."}
          </p>

          <p className="text-sm text-emerald-700 font-medium uppercase">
            {user?.role ||
              "ADMIN"}
          </p>
        </div>

        <div className="h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg font-bold">
          {user?.fullName?.charAt(
            0
          ) || "A"}
        </div>
      </div>
    </header>
  );
}