import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.route";
import testRoutes from "./routes/test.route";
import doctorRoutes from "./modules/doctor/doctor.route";
import patientRoutes from "./modules/patient/patient.route";
import appointmentRoutes from "./modules/appointment/appointment.route";
import billingRoutes from "./modules/billing/billing.route";
import aiRoutes from "./modules/ai/ai.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/patients",
  patientRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/billing",
  billingRoutes
);

app.use("/api/ai", aiRoutes);

app.get("/", (_req, res) => {
  res.send("MediMind AI API Running 🚀");
});

export default app;