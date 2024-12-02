import foodRoute from "./foodRoutes.js";
import foodTypeRoute from "./foodTypeRoute.js";
import userRoute from "./userRoutes.js";



export default function routes(server) {
  server.use("/api", foodRoute);
  server.use("/api", foodTypeRoute);
  server.use("/api", userRoute);
}
