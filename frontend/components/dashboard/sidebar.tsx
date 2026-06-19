"use client";

import Link
from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  LayoutDashboard,
  UserRound,
  Users,
  CalendarDays,
  CreditCard,
  Bot,
  LogOut,
  FileText,
} from "lucide-react";

import { api }
from "@/lib/axios";

interface User {
  role: string;
}

export default function Sidebar() {
  const [user,
    setUser] =
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

  const handleLogout =
    () => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.replace(
        "/login"
      );
    };

  const roleLinks = {
    ADMIN: [
      {
        name:
          "Dashboard",
        href:
          "/dashboard",
        icon:
          LayoutDashboard,
      },

      
      {
        name:
          "Doctors",
        href:
          "/dashboard/doctors",
        icon:
          UserRound,
      
      },

      {
  name:
    "Staff",
  href:
    "/dashboard/staff",
  icon:
    Users,
},

      {
        name:
          "Patients",
        href:
          "/dashboard/patients",
        icon:
          Users,
      },

      {
        name:
          "Appointments",
        href:
          "/dashboard/appointments",
        icon:
          CalendarDays,
      },

      {
        name: "Medical Records",
        href: "/dashboard/medical-records",
        icon: FileText,
    },

      {
        name:
          "Billing",
        href:
          "/dashboard/billing",
        icon:
          CreditCard,
      },

      {
        name:
          "AI Assistant",
        href:
          "/dashboard/ai-assistant",
        icon:
          Bot,
      },
    ],

    DOCTOR: [
      {
        name:
          "My Patients",
        href:
          "/dashboard/patients",
        icon:
          Users,
      },

      {
  name: "Medical Records",
  href: "/dashboard/medical-records",
  icon: FileText,
},

      {
        name:
          "Appointments",
        href:
          "/dashboard/appointments",
        icon:
          CalendarDays,
      },

      {
        name:
          "AI Assistant",
        href:
          "/dashboard/ai-assistant",
        icon:
          Bot,
      },
    ],

    RECEPTIONIST: [
      {
        name:
          "Patients",
        href:
          "/dashboard/patients",
        icon:
          Users,
      },

      {
  name: "Medical Records",
  href: "/dashboard/medical-records",
  icon: FileText,
},

      {
        name:
          "Appointments",
        href:
          "/dashboard/appointments",
        icon:
          CalendarDays,
      },

      {
        name:
          "Billing",
        href:
          "/dashboard/billing",
        icon:
          CreditCard,
      },
    ],

   PATIENT: [
  {
    name:
      "My Appointments",
    href:
      "/dashboard/appointments",
    icon:
      CalendarDays,
  },

  {
    name:
      "My Bills",
    href:
      "/dashboard/billing",
    icon:
      CreditCard,
  },

  {
  name: "My Records",
  href: "/dashboard/medical-records",
  icon: FileText,
},

  {
    name:
      "AI Assistant",
    href:
      "/dashboard/ai-assistant",
    icon:
      Bot,
  },
],
  };

  const links =
    roleLinks[
      user?.role as keyof typeof roleLinks
    ] || [];

  return (
    <aside className="w-72 bg-emerald-700 text-white h-screen p-6 flex flex-col shadow-xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          MediMind
        </h1>

        <p className="text-emerald-100 text-sm">
          Healthcare AI
        </p>

        <div className="mt-4 text-xs uppercase bg-white/20 inline-block px-3 py-1 rounded-full">
          {user?.role ||
            "Loading"}
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {links.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <Link
                key={
                  item.name
                }
                href={
                  item.href
                }
                className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/20 transition"
              >
                <Icon
                  size={20}
                />

                {
                  item.name
                }
              </Link>
            );
          }
        )}
      </nav>

      <button
        onClick={
          handleLogout
        }
        className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-red-500/20 transition text-red-100"
      >
        <LogOut
          size={20}
        />
        Logout
      </button>
    </aside>
  );
}