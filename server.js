import express from "express";
import { config } from "dotenv";
config();
import DBConnection from "./config/Db.Connect.js";
import FaqRoutes from "./routes/FAQ.routes.js";
const app = express();
app.use(express.json());
app.use("/Faqs", FaqRoutes);
app.listen(process.env.PORT, async () => {
  console.log("Our App is working on " + process.env.PORT);
  await DBConnection();
});
export default app;
