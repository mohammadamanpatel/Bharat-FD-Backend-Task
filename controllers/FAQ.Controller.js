import redisClient from "../config/RedisConfig.js";
import Faq from "../models/FAQModel.js";
import { translateText } from "../Trans_Util/TransLate_Text.js";

export const Create_FAQ = async (req, res) => {
  try {
    const { question, answer, targetLanguage = "en" } = req.body;

    console.log("Creating FAQ with question:", question, "and answer:", answer);

    // Translate the question and answer
    const translatedQuestion = await translateText(question, targetLanguage);
    const translatedAnswer = await translateText(answer, targetLanguage);

    const translations = {};
    translations[targetLanguage] = {
      question: translatedQuestion,
      answer: translatedAnswer,
    };

    console.log("Translations added:", translations);

    const faq = await Faq.create({
      question,
      answer,
      translations,
    });

    console.log("FAQ created successfully:", faq);

    // Clear cache after adding new FAQ
    await redisClient.del(`faqs:${targetLanguage}`);
    console.log(`Cache cleared for faqs:${targetLanguage}`);

    return res.status(200).json({
      message: "Faq Created Successfully",
      faq: faq,
    });
  } catch (err) {
    console.error("Error in Create_FAQ:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const GetAllFaqs = async (req, res) => {
  try {
    const targetLanguage = req.query.targetLanguage || "en";
    console.log("Fetching FAQs for targetLanguage:", targetLanguage);

    // Check Redis cache first
    const cachedFaqs = await redisClient.get(`faqs:${targetLanguage}`);
    if (cachedFaqs) {
      console.log("Found cached FAQs for targetLanguage:", targetLanguage);
      return res.status(200).json({
        translatedFaqs: JSON.parse(cachedFaqs),
      });
    }

    console.log("No cached FAQs found. Fetching from database.");

    // If not found in cache, fetch from database
    const faqs = await Faq.find();

    const translatedFaqs = faqs.map((faq) => {
      const translations = faq.translations ? faq.translations : {};
      const translatedData = translations[targetLanguage] || translations["en"];

      const translatedQuestion = translatedData
        ? translatedData.question
        : faq.question;
      const translatedAnswer = translatedData
        ? translatedData.answer
        : faq.answer;

      return {
        ...faq.toObject(),
        translations,
        question: translatedQuestion,
        answer: translatedAnswer,
      };
    });

    // Cache the translated FAQs in Redis
    await redisClient.setEx(
      `faqs:${targetLanguage}`,
      3600,
      JSON.stringify(translatedFaqs)
    );
    console.log("Cached translated FAQs for targetLanguage:", targetLanguage);

    return res.status(200).json({
      translatedFaqs,
    });
  } catch (error) {
    console.error("Error in GetAllFaqs:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const Update_Faq = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Faq Id not found",
      });
    }

    const { question, answer, targetLanguage = "en" } = req.body;
    console.log(
      "Updating FAQ with ID:",
      id,
      "question:",
      question,
      "answer:",
      answer
    );

    // Translate the question and answer
    const translatedQuestion = await translateText(question, targetLanguage);
    const translatedAnswer = await translateText(answer, targetLanguage);

    const translations = {};
    translations[targetLanguage] = {
      question: translatedQuestion,
      answer: translatedAnswer,
    };
    console.log("translations",translations)
    const updatedFAQ = await Faq.findByIdAndUpdate(
      id,
      {
        question,
        answer,
        translations,
      },
      { new: true }
    );

    console.log("FAQ updated successfully:", updatedFAQ);

    // Clear cache after updating an FAQ
    await redisClient.del(`faqs:${targetLanguage}`);
    console.log(`Cache cleared for faqs:${targetLanguage}`);

    return res.status(200).json({
      message: "Successfully Updated Faq",
      UpdatedFAQ: updatedFAQ,
    });
  } catch (err) {
    console.error("Error in Update_Faq:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const Delete_Faq = async (req, res) => {
  try {
    const { targetLanguage = "en" } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Faq Id not found",
      });
    }

    console.log("Deleting FAQ with ID:", id);

    await Faq.findByIdAndDelete(id);

    // Clear cache after deleting an FAQ
    await redisClient.del(`faqs:${targetLanguage}`);
    console.log(`Cache cleared for faqs:${targetLanguage}`);

    return res.status(200).json({
      message: "Faq Deleted",
    });
  } catch (err) {
    console.error("Error in Delete_Faq:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
