import mongoose from "mongoose";
const FaqModel = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, requred: true },
    translations: {
      type: Map,
      of: {
        question: { type: String },
        answer: { type: String },
      },
      default: {},
    },
  },
  { timestamps: true }
);
const Faq = mongoose.model("Faq", FaqModel);
export default Faq;
