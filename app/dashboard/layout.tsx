"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import Navbar
from "@/components/dashboard/navbar";
import Sidebar
from "@/components/dashboard/sidebar";

import { api }
from "@/lib/axios";

import {
  roleAccess,
} from "@/lib/access";

export default function
DashboardLayout({
  children,
}: {
  children:
    React.ReactNode;
}) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const checkAccess =
      async () => {
        try {
          const res =
            await api.get(
              "/auth/profile"
            );

          const role =
            res.data
              .role;

          const allowedRoutes =
            roleAccess[
              role as keyof typeof roleAccess
            ];

          if (
            !allowedRoutes?.includes(
              pathname
            )
          ) {
            router.replace(
              "/login"
            );

            return;
          }
        } catch {
          router.replace(
            "/login"
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    checkAccess();
  }, [
    pathname,
    router,
  ]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <Navbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}