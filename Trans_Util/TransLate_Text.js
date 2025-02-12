import googleTranslate from "googletrans";

export const translateText = async (text, targetLanguage) => {
  console.log("translateText called with text:", text, "and targetLanguage:", targetLanguage);
  try {
    const translated = await googleTranslate.translate(text, {
      to: targetLanguage,
    });
    console.log("Translation successful. Translated text:", translated.text);
    return translated.text;
  } catch (err) {
    console.error("Translation failed with error:", err);
  }
};
