"use client";

import LoginForm from "@/components/forms/login-form";
import {
  ShieldCheck,
  Brain,
  CalendarCheck,
  Wallet,
} from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex bg-emerald-50">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-700 to-emerald-500 text-white p-16 flex-col justify-between relative overflow-hidden">
        <div>
          <h1 className="text-5xl font-bold">
            MediMind AI
          </h1>

          <p className="text-emerald-100 text-xl mt-4 max-w-lg leading-relaxed">
            Smart hospital management
            powered by AI,
            automation, and
            intelligent healthcare
            workflows.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Brain size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                AI Medical Assistant
              </h3>

              <p className="text-emerald-100 text-sm">
                Smart symptom
                guidance and report
                explanations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <CalendarCheck size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Appointment System
              </h3>

              <p className="text-emerald-100 text-sm">
                Seamless doctor &
                patient scheduling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Wallet size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Smart Billing
              </h3>

              <p className="text-emerald-100 text-sm">
                Cash, UPI & card
                payments tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <ShieldCheck
                size={24}
              />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Secure Access
              </h3>

              <p className="text-emerald-100 text-sm">
                Role-based secure
                authentication
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-emerald-100">
          © 2026 MediMind AI
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-[2rem] p-10 border border-emerald-100">
            <div className="mb-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-5">
                <span className="text-4xl">
                  🏥
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Login to your
                MediMind account
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}