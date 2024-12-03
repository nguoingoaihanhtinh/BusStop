
import busRoute from "./busRoute.js";
import ticketRoute from "./ticketRoute.js";
import userRoute from "./userRoutes.js";



export default function routes(server) {
  server.use("/api/bus", busRoute);
  server.use("/api/tickets", ticketRoute);
  server.use("/api/user", userRoute);
}
