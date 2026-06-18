"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


interface User {
  role: string;
  email: string;
}

interface Patient {
  id: string;
  user: {
    fullName: string;
  };
}

interface Appointment {
  id: string;
}

interface Bill {

  
  id: string;

  amount: number;

  consultationFee:
    number;

  medicineCost:
    number;

  labCost: number;

  roomCharge:
    number;

  discount:
    number;

  paymentMethod?:
    string;

  createdAt:
  string;

  status: string;

 patient: {
  age: number;
  gender: string;
  bloodGroup?: string;
  medicalHistory?: string;

  user: {
    fullName: string;
    email: string;
  };
};

appointment: {
  appointmentAt:
    string;

  doctor: {
    specialization?:
      string;

    user: {
      fullName:
        string;
    };
  };
};

transaction?: {
  method:
    string;

  reference?:
    string;
};
}

export default function BillingPage() {
  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [bills, setBills] =
    useState<Bill[]>([]);

  const [user,
  setUser] =
  useState<User | null>(
    null
  );

  const [form, setForm] =
  useState({
    patientId: "",
    appointmentId:
      "",

    consultationFee:
      "500",

    medicineCost:
      "0",

    labCost:
      "0",

    roomCharge:
      "0",

    discount:
      "0",

    method:
      "CASH",
  });

    const totalAmount =
  Number(
    form.consultationFee
  ) +
  Number(
    form.medicineCost
  ) +
  Number(
    form.labCost
  ) +
  Number(
    form.roomCharge
  ) -
  Number(
    form.discount
  );

  const fetchData =
    async () => {
      try {
        const [
  patientsRes,
  appointmentsRes,
  billsRes,
  profileRes,
] = await Promise.all([
  api.get("/patients"),
  api.get(
    "/appointments"
  ),
  api.get("/billing"),
  api.get(
    "/auth/profile"
  ),
]);    
        setUser(
  profileRes.data
);

        setPatients(
          patientsRes.data
        );

        setAppointments(
          appointmentsRes.data
        );

        let filteredBills =
  billsRes.data;

const role =
  profileRes.data.role;

const email =
  profileRes.data.email;

// PATIENT
if (
  role ===
  "PATIENT"
) {
  filteredBills =
    billsRes.data.filter(
      (
        bill: any
      ) =>
        bill.patient
          ?.user
          ?.email ===
        email
    );
}

setBills(
  filteredBills
);
      } catch {
        toast.error(
          "Failed loading billing data"
        );
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
        const billRes =
          await api.post(
            "/billing/bill",
            {
  patientId:
    form.patientId,

  appointmentId:
    form.appointmentId,

  consultationFee:
    Number(
      form.consultationFee
    ),

  medicineCost:
    Number(
      form.medicineCost
    ),

  labCost:
    Number(
      form.labCost
    ),

  roomCharge:
    Number(
      form.roomCharge
    ),

  discount:
    Number(
      form.discount
    ),

  amount:
    totalAmount,

  paymentMethod:
    form.method,
}
          );

        

        toast.success(
          "Bill generated"
        );

        setForm({
  patientId: "",
  appointmentId:
    "",

  consultationFee:
    "500",

  medicineCost:
    "0",

  labCost:
    "0",

  roomCharge:
    "0",

  discount:
    "0",

  method:
    "CASH",
});

        fetchData();
      } catch {
        toast.error(
          "Failed generating bill"
        );
      }
    };

    const handlePayment =
  async (
    bill: Bill
  ) => {
    try {
      const {
        data,
      } =
        await api.post(
          "/payment/create-order",
          {
            amount:
      bill.amount,
          }
        );

      const options =
        {
          key:
            process.env
              .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount:
            data.amount,

          currency:
            "INR",

          name:
            "MediMind AI",

          description:
            "Hospital Payment",

          order_id:
            data.id,

          handler:
  async (
    response: any
  ) => {
    try {
      await api.post(
        "/billing/transaction",
        {
          billId:
            bill.id,

          amount:
            bill.amount,

          method:
            "RAZORPAY",

          reference:
            response
              .razorpay_payment_id,
        }
      );

      toast.success(
        "Payment Successful"
      );

      fetchData();
    } catch {
      toast.error(
        "Failed saving payment"
      );
    }
  },

          theme: {
            color:
              "#059669",
          },
        };

      const razorpay =
        new (
          window as any
        ).Razorpay(
          options
        );

      razorpay.open();
    } catch {
      toast.error(
        "Payment failed"
      );
    }
  };

 const downloadInvoice =
  (bill: Bill) => {
    const doc =
      new jsPDF();

    const emerald: [number, number, number] =
      [16, 185, 129];

    // ========= HEADER =========
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(
      20
    );

    doc.text(
      "MEDIMIND AI HOSPITAL",
      20,
      20
    );

    doc.setFontSize(
      12
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "Medical Billing Invoice",
      20,
      28
    );

    doc.setDrawColor(
      ...emerald
    );

    doc.setLineWidth(
      0.8
    );

    doc.line(
      20,
      34,
      190,
      34
    );

    // ========= HOSPITAL INFO =========
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Hospital Information",
      20,
      48
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "MediMind AI Hospital",
      20,
      56
    );

    doc.text(
      "Advanced Smart Healthcare System",
      20,
      62
    );

    doc.text(
      "support@medimind.ai",
      20,
      68
    );

    // ========= INVOICE META =========
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Invoice Metadata",
      130,
      48
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Invoice ID: ${bill.id.slice(
        0,
        10
      )}`,
      130,
      56
    );

    doc.text(
      `Date: ${new Date(
        bill.createdAt
      ).toLocaleDateString()}`,
      130,
      62
    );

    doc.text(
      `Status: ${bill.status}`,
      130,
      68
    );

    doc.text(
      `Payment: ${
        bill
          .transaction
          ?.method ||
        "Pending"
      }`,
      130,
      74
    );

    // ========= PATIENT =========
    doc.setDrawColor(
      180
    );

    doc.line(
      20,
      82,
      190,
      82
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Patient Information",
      20,
      94
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Name: ${bill.patient.user.fullName}`,
      20,
      104
    );

    doc.text(
      `Age: ${bill.patient.age}`,
      20,
      112
    );

    doc.text(
      `Gender: ${bill.patient.gender}`,
      20,
      120
    );

    doc.text(
      `Blood Group: ${
        bill.patient
          .bloodGroup ||
        "N/A"
      }`,
      20,
      128
    );

    doc.text(
      `Email: ${bill.patient.user.email}`,
      20,
      136
    );

    // ========= DOCTOR =========
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Doctor Information",
      110,
      94
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Doctor: Dr. ${
        bill
          .appointment
          ?.doctor
          ?.user
          ?.fullName ||
        "Doctor"
      }`,
      110,
      104
    );

    doc.text(
      `Department: ${
        bill
          .appointment
          ?.doctor
          ?.specialization ||
        "General"
      }`,
      110,
      112
    );

    doc.text(
      `Appointment Date: ${
        new Date(
          bill
            .appointment
            .appointmentAt
        ).toLocaleDateString()
      }`,
      110,
      120
    );

    // ========= BILL TABLE =========
    autoTable(
      doc,
      {
        startY: 150,

        head: [
          [
            "Service",
            "Description",
            "Amount",
          ],
        ],

        body: [
          [
            "Consultation",
            "Doctor Consultation Fee",
            `Rs ${bill.consultationFee}`,
          ],

          [
            "Medicine",
            "Prescribed Medication",
            `Rs ${bill.medicineCost}`,
          ],

          [
            "Lab Tests",
            "Diagnostic Charges",
            `Rs ${bill.labCost}`,
          ],

          [
            "Room Charges",
            "Hospital Stay Charges",
            `Rs ${bill.roomCharge}`,
          ],

          [
            "Discount",
            "Applied Discount",
            `- Rs ${bill.discount}`,
          ],
        ],

        theme:
          "grid",

        headStyles: {
          fillColor:
            emerald,
          textColor:
            [255, 255, 255],
          fontStyle:
            "bold",
        },

        styles: {
          fontSize:
            10,
          cellPadding:
            4,
        },
      }
    );

    const finalY =
      (
        doc as any
      ).lastAutoTable
        .finalY;

    // ========= TOTAL =========
    doc.setDrawColor(
      180
    );

    doc.line(
      20,
      finalY + 10,
      190,
      finalY + 10
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(
      14
    );

    doc.text(
      `Total Amount: Rs ${bill.amount}`,
      140,
      finalY + 22
    );

    // ========= NOTES =========
    doc.setFontSize(
      10
    );

    doc.setFont(
      "helvetica",
      "italic"
    );

    doc.text(
      "This invoice is system generated and does not require a signature.",
      20,
      finalY + 38
    );

    doc.text(
      "For queries contact MediMind AI Hospital billing department.",
      20,
      finalY + 45
    );

    doc.save(
      `invoice-${bill.id}.pdf`
    );
  };
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Billing
        </h1>

        <p className="text-gray-500">
          Manage hospital payments
        </p>
      </div>
      {user?.role !==
  "PATIENT" && (
      <Card className="bg-white p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Generate Bill
        </h2>
        

        <form
          onSubmit={
            handleCreate
          }
          className="grid md:grid-cols-2 gap-4"
        >
          <select
            className="border rounded-xl p-3"
            value={
              form.patientId
            }
            onChange={(e) =>
              setForm({
                ...form,
                patientId:
                  e.target
                    .value,
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
            className="border rounded-xl p-3"
            value={
              form.appointmentId
            }
            onChange={(e) =>
              setForm({
                ...form,
                appointmentId:
                  e.target
                    .value,
              })
            }
          >
            <option value="">
              Select Appointment
            </option>

            {appointments.map(
              (
                appointment
              ) => (
                <option
                  key={
                    appointment.id
                  }
                  value={
                    appointment.id
                  }
                >
                  {appointment.id.slice(
                    0,
                    8
                  )}
                </option>
              )
            )}
          </select>

         <div>
  <p className="text-sm text-gray-500 mb-1">
    Consultation Fee
  </p>

  <Input
    type="number"
    value={
      form.consultationFee
    }
    onChange={(e) =>
      setForm({
        ...form,
        consultationFee:
          e.target.value,
      })
    }
  />
</div>

 <div>
  <p className="text-sm text-gray-500 mb-1">
    Medicine Cost
  </p>

  <Input
    type="number"
    value={
      form.medicineCost
    }
    onChange={(e) =>
      setForm({
        ...form,
        medicineCost:
          e.target.value,
      })
    }
  />
</div>

<div>
  <p className="text-sm text-gray-500 mb-1">
    Lab Test Cost
  </p>

  <Input
    type="number"
    value={
      form.labCost
    }
    onChange={(e) =>
      setForm({
        ...form,
        labCost:
          e.target.value,
      })
    }
  />
</div>

<div>
  <p className="text-sm text-gray-500 mb-1">
    Room Charges
  </p>

  <Input
    type="number"
    value={
      form.roomCharge
    }
    onChange={(e) =>
      setForm({
        ...form,
        roomCharge:
          e.target.value,
      })
    }
  />
</div>

<div>
  <p className="text-sm text-gray-500 mb-1">
    Discount
  </p>

  <Input
    type="number"
    value={
      form.discount
    }
    onChange={(e) =>
      setForm({
        ...form,
        discount:
          e.target.value,
      })
    }
  />
</div>

          <select
            className="border rounded-xl p-3"
            value={
              form.method
            }
            onChange={(e) =>
              setForm({
                ...form,
                method:
                  e.target
                    .value,
              })
            }
          >
            <option>
              CASH
            </option>
            <option>
              UPI
            </option>
            <option>
              CARD
            </option>
          </select>
            <div className="border rounded-xl p-4 bg-emerald-50">
  <p className="text-lg font-semibold text-emerald-700">
    Total Bill:
    ₹{totalAmount}
  </p>
</div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Generate Bill
          </Button>
        </form>
      </Card>
      )}

      <Card className="bg-white p-6 rounded-3xl shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">
          {
 user?.role ===
 "PATIENT"
 ? "My Medical Bills"
 : "Billing History"
}
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">
                Patient
              </th>

              <th>
                Amount
              </th>

              <th>
                Method
              </th>

              <th>
                Status
              </th>
              <th>
  Payment
</th>
            <th>
  Invoice
</th>
            </tr>
          </thead>

          <tbody>
            {bills.map(
              (bill) => (
                <tr
                  key={
                    bill.id
                  }
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">
                    {
                      bill
                        .patient
                        .user
                        .fullName
                    }
                  </td>

                  <td>
                    ₹
                    {
                      bill.amount
                    }
                  </td>

                  <td>
                    {bill
                      .transaction
                      ?.method ||
                      "-"}
                  </td>

                  <td>
                    <span className="text-green-600 font-medium">
                      {
                        bill.status
                      }
                    </span>
                  </td>
                  <td>
  {user?.role !==
  "PATIENT" && (
  <Button
    onClick={() =>
      handlePayment(
        bill
      )
    }
    className="bg-emerald-600 hover:bg-emerald-700"
  >
    Pay
  </Button>
    )}
</td>

        <td>
  <Button
    variant="outline"
    onClick={() =>
      downloadInvoice(
        bill
      )
    }
  >
    Invoice
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