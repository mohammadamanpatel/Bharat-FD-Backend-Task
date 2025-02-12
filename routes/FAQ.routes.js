import express from "express";
import {
  Create_FAQ,
  Delete_Faq,
  GetAllFaqs,
  Update_Faq,
} from "../controllers/FAQ.Controller.js";
import { verifyUser } from "../middlewares/Auth.middleware.js";
import { authorizeRole } from "../middlewares/Role.middleware.js";
const router = express.Router();
router.post("/create-faq", verifyUser, authorizeRole(["Admin"]), Create_FAQ);
router.get("/", GetAllFaqs);
router.put("/:id", verifyUser, authorizeRole(["Admin"]), Update_Faq);
router.delete("/:id", verifyUser, authorizeRole(["Admin"]), Delete_Faq);
export default router;
