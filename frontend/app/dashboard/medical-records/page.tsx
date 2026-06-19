"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Patient {
  id: string;
  patientCode?: string;

  user: {
    fullName: string;
  };
}

interface Doctor {
  id: string;

  user: {
    fullName: string;
  };
}

interface MedicalRecord {
  id: string;

  diagnosis: string;
  prescription?: string;
  visitReason?: string;
  allergies?: string;
  notes?: string;

  patient: {
    patientCode?: string;

    user: {
      fullName: string;
    };
  };

  doctor?: {
    user: {
      fullName: string;
    };
  };

  createdAt: string;
}

export default function MedicalRecordsPage() {
  const [records, setRecords] =
    useState<MedicalRecord[]>([]);

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [form, setForm] =
    useState({
      patientId: "",
      doctorId: "",

      diagnosis: "",
      prescription: "",

      visitReason: "",
      allergies: "",

      notes: "",
    });

  const fetchData =
    async () => {
      try {
        const [
          recordsRes,
          patientsRes,
          doctorsRes,
        ] = await Promise.all([
          api.get("/medical-records"),
          api.get("/patients"),
          api.get("/doctors"),
        ]);

        setRecords(
          recordsRes.data
        );

        setPatients(
          patientsRes.data
        );

        setDoctors(
          doctorsRes.data
        );
      } catch {
        toast.error(
          "Failed loading data"
        );
      } finally {
        setLoading(false);
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
          "/medical-records",
          form
        );

        toast.success(
          "Medical record created"
        );

        setForm({
          patientId: "",
          doctorId: "",

          diagnosis: "",
          prescription: "",

          visitReason: "",
          allergies: "",

          notes: "",
        });

        fetchData();
      } catch {
        toast.error(
          "Failed creating record"
        );
      }
    };

  const handleDelete =
    async (
      id: string
    ) => {
      try {
        await api.delete(
          `/medical-records/${id}`
        );

        toast.success(
          "Medical record deleted"
        );

        fetchData();
      } catch {
        toast.error(
          "Failed deleting record"
        );
      }
    };

  const filteredRecords =
    records.filter(
      (record) =>
        record.patient.user.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        record.diagnosis
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Medical Records
        </h1>

        <p className="text-gray-500">
          Manage patient diagnoses,
          prescriptions and visit history
        </p>
      </div>

      {/* CREATE FORM */}
      <Card className="p-6 rounded-3xl shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Add Medical Record
        </h2>

        <form
          onSubmit={
            handleCreate
          }
          className="grid md:grid-cols-3 gap-4"
        >
          <select
            className="border rounded-md p-2"
            value={
              form.patientId
            }
            onChange={(e) =>
              setForm({
                ...form,
                patientId:
                  e.target.value,
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

          <select
            className="border rounded-md p-2"
            value={
              form.doctorId
            }
            onChange={(e) =>
              setForm({
                ...form,
                doctorId:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Doctor
            </option>

            {doctors.map(
              (
                doctor
              ) => (
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

          <Input
            placeholder="Diagnosis"
            value={
              form.diagnosis
            }
            onChange={(e) =>
              setForm({
                ...form,
                diagnosis:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Visit Reason"
            value={
              form.visitReason
            }
            onChange={(e) =>
              setForm({
                ...form,
                visitReason:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Prescription"
            value={
              form.prescription
            }
            onChange={(e) =>
              setForm({
                ...form,
                prescription:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Allergies"
            value={
              form.allergies
            }
            onChange={(e) =>
              setForm({
                ...form,
                allergies:
                  e.target.value,
              })
            }
          />

          <Input
            placeholder="Notes"
            value={
              form.notes
            }
            onChange={(e) =>
              setForm({
                ...form,
                notes:
                  e.target.value,
              })
            }
          />

          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Create Record
          </Button>
        </form>
      </Card>

      {/* SEARCH */}
      <Card className="p-6 rounded-3xl shadow-md bg-white">
        <Input
          placeholder="Search patient or diagnosis..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </Card>

      {/* TABLE */}
      <Card className="p-6 rounded-3xl shadow-md bg-white overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">
          Medical Records
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-3">
                  Patient
                </th>

                <th>
                  Doctor
                </th>

                <th>
                  Diagnosis
                </th>

                <th>
                  Visit Reason
                </th>

                <th>
                  Date
                </th>

                <th>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map(
                (
                  record
                ) => (
                  <tr
                    key={
                      record.id
                    }
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 font-medium">
                      {
                        record
                          .patient
                          .user
                          .fullName
                      }
                    </td>

                    <td>
                      {record
                        .doctor
                        ?.user
                        .fullName ||
                        "-"}
                    </td>

                    <td>
                      {
                        record.diagnosis
                      }
                    </td>

                    <td>
                      {
                        record.visitReason
                      }
                    </td>

                    <td>
                      {new Date(
                        record.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <Button
                        onClick={() =>
                          handleDelete(
                            record.id
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