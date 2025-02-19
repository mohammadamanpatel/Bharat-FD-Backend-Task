import redisClient from "../config/RedisConfig.js";
import Faq from "../models/FAQModel.js";
import { translateText } from "../Trans_Util/TransLate_Text.js";

export const Create_FAQ = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { question, answer, translations = {} } = req.body;

    console.log("Creating FAQ with question:", question, "and answer:", answer);

    let translatedEntries = {};
    for (const lang in translations) {
      const translatedQuestion = await translateText(question, lang);
      const translatedAnswer = await translateText(answer, lang);
      translatedEntries[lang] = { question: translatedQuestion, answer: translatedAnswer };
    }

    console.log("Translations added:", translatedEntries);

    const faq = await Faq.create({
      question,
      answer,
      translations: translatedEntries,
    });

    for (const lang in translatedEntries) {
      await redisClient.del(`faqs:${lang}`);
    }

    return res.status(200).json({ message: "FAQ Created Successfully", faq });
  } catch (err) {
    console.error("Error in Create_FAQ:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const GetAllFaqs = async (req, res) => {
  try {
    const targetLanguage = req.query.targetLanguage || "en";
    console.log("Fetching FAQs for targetLanguage:", targetLanguage);

    // Check Redis cache first
    const cachedFaqs = await redisClient.get(`faqs:${targetLanguage}`);
    if (cachedFaqs) {
      console.log("Returning Cached FAQs");
      return res.status(200).json({ translatedFaqs: JSON.parse(cachedFaqs) });
    }

    // Fetch FAQs from DB
    const faqs = await Faq.find();
    console.log("Fetched FAQs from DB:", faqs);

    const translatedFaqs = faqs.map((faq) => {
      console.log("Processing FAQ:", faq);

      let translatedData = { question: faq.question, answer: faq.answer };

      // Ensure translations exist and extract the correct language
      if (faq.translations instanceof Map) {
        translatedData = faq.translations.get(targetLanguage) || faq.translations.get("en") || translatedData;
      } else if (typeof faq.translations === "object") {
        translatedData = faq.translations[targetLanguage] || faq.translations["en"] || translatedData;
      }

      return {
        _id: faq._id,
        question: translatedData.question,
        answer: translatedData.answer,
        createdAt: faq.createdAt,
        updatedAt: faq.updatedAt
      };
    });

    // Store the translated FAQs in Redis
    await redisClient.setEx(`faqs:${targetLanguage}`, 3600, JSON.stringify(translatedFaqs));

    return res.status(200).json({ translatedFaqs });
  } catch (error) {
    console.error("Error in GetAllFaqs:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const Update_Faq = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "FAQ Id not found" });

    const { question, answer, translations = {} } = req.body;
    console.log("Updating FAQ with ID:", id);

    let updatedTranslations = {};
    for (const lang in translations) {
      const translatedQuestion = await translateText(question, lang);
      const translatedAnswer = await translateText(answer, lang);
      updatedTranslations[lang] = { question: translatedQuestion, answer: translatedAnswer };
    }

    const updatedFAQ = await Faq.findByIdAndUpdate(
      id,
      { question, answer, $set: { [`translations`]: updatedTranslations } },
      { new: true }
    );

    for (const lang in updatedTranslations) {
      await redisClient.del(`faqs:${lang}`);
    }

    return res.status(200).json({ message: "Successfully Updated FAQ", updatedFAQ });
  } catch (err) {
    console.error("Error in Update_Faq:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const Delete_Faq = async (req, res) => {
  try {
    const { id } = req.params;
    const { targetLanguage } = req.body;
    if (!id) return res.status(400).json({ message: "FAQ Id not found" });

    const faq = await Faq.findById(id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    if (targetLanguage && faq.translations[targetLanguage]) {
      delete faq.translations[targetLanguage];
      await faq.save();
      await redisClient.del(`faqs:${targetLanguage}`);
      return res.status(200).json({ message: `FAQ translation in ${targetLanguage} deleted` });
    } else {
      await Faq.findByIdAndDelete(id);
      for (const lang in faq.translations) {
        await redisClient.del(`faqs:${lang}`);
      }
      return res.status(200).json({ message: "FAQ Deleted" });
    }
  } catch (err) {
    console.error("Error in Delete_Faq:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
