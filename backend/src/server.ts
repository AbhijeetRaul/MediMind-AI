import app from "./app";
import paymentRoutes
from "./modules/payment/payment.route";
import staffRoutes
from "./modules/staff/staff.route";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/staff",
  staffRoutes
);