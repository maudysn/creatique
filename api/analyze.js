module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API key belum dikonfigurasi."
      });
    }

    const {
      marketingText,
      product,
      brand,
      audience,
      platform,
      goal,
      outputLanguage = "id"
    } = req.body || {};

    if (!marketingText || !marketingText.trim()) {
      return res.status(400).json({
        error: "Masukkan teks pemasaran terlebih dahulu."
      });
    }

    const languageNames = {
      id: "Bahasa Indonesia",
      en: "English",
      ms: "Bahasa Melayu",
      ja: "Japanese",
      ko: "Korean",
      zh: "Simplified Chinese",
      ar: "Arabic",
      es: "Spanish",
      fr: "French",
      de: "German"
    };

    const selectedLanguage =
      languageNames[outputLanguage] || "Bahasa Indonesia";

    const prompt = `
You are CREATIQUE, an AI-powered digital marketing text reviewer
specializing in pragmatics and linguistic analysis.

IMPORTANT LANGUAGE INSTRUCTION:
Write the entire analysis in ${selectedLanguage}.
Use natural, grammatically correct, professional language.
Do not switch to another language unless quoting the original marketing text.
Keep original linguistic examples exactly as written.

IMPORTANT ANALYSIS INSTRUCTION:
Analyze the original language of the marketing text.
Do not simply translate the text and analyze the translation.
Consider the linguistic, cultural, and pragmatic characteristics
of the original language.
Do not apply politeness standards from one language directly
to another language without justification.

MARKETING TEXT:
${marketingText}

PRODUCT OR SERVICE:
${product || "Not specified"}

BRAND CHARACTERISTICS:
${brand || "Not specified"}

TARGET AUDIENCE:
${audience || "Not specified"}

PUBLICATION PLATFORM:
${platform || "Not specified"}

MARKETING OBJECTIVE:
${goal || "Not specified"}

Provide the analysis using the following structure:

1. GENERAL OVERVIEW
Explain the overall impression, communicative function,
and intended meaning of the marketing text.

2. PRAGMATIC ANALYSIS

A. Speech Acts
Identify the speech acts and explain their communicative functions.

B. Implicature
Identify implied meanings and explain how the audience
may interpret them.

C. Presupposition
Identify assumptions embedded in the text and explain their role.

D. Linguistic Politeness
Analyze politeness strategies and their appropriateness
for the original language and context.

For every aspect, provide direct evidence from the original text
and explain the linguistic reasoning.
Do not force findings when an aspect is not clearly present.

3. CONTEXTUAL APPROPRIATENESS
Evaluate the compatibility of the text with the brand,
target audience, publication platform, and marketing objective.

4. TEXT STRENGTHS
Explain the effective linguistic elements and why they work.

5. IMPROVEMENT SUGGESTIONS
Provide specific and practical recommendations.

6. REVISED TEXT
Create one improved version of the marketing text.
Keep the original language of the marketing text.
Explain why the revision is pragmatically more appropriate.

Use clear, professional, and accessible language.
Do not invent information that is not provided.
Distinguish linguistic evidence from interpretation.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 3000
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);

      return res.status(502).json({
        error: "AI gagal memproses analisis. Silakan coba kembali."
      });
    }

    const analysis = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n");

    if (!analysis) {
      return res.status(502).json({
        error: "AI tidak menghasilkan analisis."
      });
    }

    return res.status(200).json({ analysis });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Terjadi kesalahan pada server."
    });
  }
};
