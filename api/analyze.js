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
You are CREATIQUE, an AI-powered digital marketing
text reviewer specializing in pragmatics and linguistics.

OUTPUT LANGUAGE:
Write all explanations in ${selectedLanguage}.
Keep original marketing text quotations unchanged.
Keep revised marketing text in its original language.

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

YOUR TASK:

Analyze the marketing text using pragmatic and
linguistic principles.

Do not invent linguistic evidence.
Do not force pragmatic categories when they are absent.
Distinguish explicit meaning from inferred meaning.
Consider the original language and cultural context.

Return ONLY a valid JSON object.
Do not use Markdown code fences.

Use exactly this structure:

{
  "overview": {
    "impression": "Overall impression of the text",
    "communicativeFunction": "Main communicative function",
    "intendedMeaning": "Intended message"
  },

  "pragmaticAnalysis": {
    "speechActs": "Analysis of speech acts",
    "implicature": "Analysis of implicature",
    "presupposition": "Analysis of presupposition",
    "politeness": "Analysis of linguistic politeness"
  },

  "pragmaticHighlights": [
    {
      "quote": "Exact quotation from original text",
      "category": "speech_act",
      "explanation": "Linguistic explanation",
      "function": "Communicative function"
    }
  ],

  "audienceInterpretations": [
    {
      "audience": "Audience perspective",
      "explicitMeaning": "Possible explicit interpretation",
      "impliedMeaning": "Possible implied interpretation",
      "possibleResponse": "Possible audience response",
      "interpretationRisk": "Potential misunderstanding or risk"
    }
  ],

  "contextualAppropriateness": {
    "brandFit": "Compatibility with brand identity",
    "audienceFit": "Compatibility with target audience",
    "platformFit": "Compatibility with publication platform",
    "goalFit": "Compatibility with marketing objective"
  },

  "textStrengths": [
    "Strength of the original text"
  ],

  "improvementSuggestions": [
    "Specific improvement suggestion"
  ],

  "revisedText": {
    "text": "One improved version in the original language",
    "explanation": "Explanation of linguistic improvements"
  }
}

RULES FOR PRAGMATIC HIGHLIGHTS:

1. Identify actual phrases or sentences from the original text.
2. Every quote must appear exactly in the original text.
3. Use these categories:
   - speech_act
   - implicature
   - presupposition
   - politeness
4. A single quotation may represent more than one
   pragmatic phenomenon when justified.
5. Do not create highlights without sufficient evidence.
6. Provide 0 to 12 relevant highlights.

RULES FOR AUDIENCE INTERPRETATION:

1. Focus on the target audience provided by the user.
2. If appropriate, identify 2 to 4 relevant audience
   perspectives or subgroups.
3. Explain both explicit and possible implied meanings.
4. Identify possible responses and interpretation risks.
5. Do not claim that all members of an audience
   interpret a message identically.
6. If the target audience is unspecified, explain
   the likely interpretation by general consumers.

RULES FOR ANALYSIS:

1. Speech acts must explain the communicative action.
2. Implicature must explain meaning beyond literal words.
3. Presupposition must identify assumptions in the text.
4. Politeness must consider linguistic and cultural context.
5. All findings must be supported by linguistic evidence.
6. If a phenomenon is absent, explain that it is not
   clearly identified instead of inventing an example.
7. Keep the revised text in the original language.

Return valid JSON only.
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
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 6000,
            responseMimeType: "application/json"
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

    const rawOutput = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n");

    if (!rawOutput) {
      return res.status(502).json({
        error: "AI tidak menghasilkan analisis."
      });
    }

    let result;

    try {
      result = JSON.parse(rawOutput);
    } catch (parseError) {
      console.error("JSON parsing error:", rawOutput);

      return res.status(502).json({
        error: "Format hasil AI tidak valid. Silakan coba kembali."
      });
    }

    const analysis = `
1. GENERAL OVERVIEW

${result.overview?.impression || "-"}

Communicative Function:
${result.overview?.communicativeFunction || "-"}

Intended Meaning:
${result.overview?.intendedMeaning || "-"}


2. PRAGMATIC ANALYSIS

Speech Acts:
${result.pragmaticAnalysis?.speechActs || "-"}

Implicature:
${result.pragmaticAnalysis?.implicature || "-"}

Presupposition:
${result.pragmaticAnalysis?.presupposition || "-"}

Linguistic Politeness:
${result.pragmaticAnalysis?.politeness || "-"}


3. CONTEXTUAL APPROPRIATENESS

Brand Fit:
${result.contextualAppropriateness?.brandFit || "-"}

Audience Fit:
${result.contextualAppropriateness?.audienceFit || "-"}

Platform Fit:
${result.contextualAppropriateness?.platformFit || "-"}

Goal Fit:
${result.contextualAppropriateness?.goalFit || "-"}


4. TEXT STRENGTHS

${(result.textStrengths || []).map(item => "- " + item).join("\n")}


5. IMPROVEMENT SUGGESTIONS

${(result.improvementSuggestions || []).map(item => "- " + item).join("\n")}


6. REVISED TEXT

${result.revisedText?.text || "-"}

Explanation:
${result.revisedText?.explanation || "-"}
`;

    return res.status(200).json({
      analysis,
      pragmaticHighlights: result.pragmaticHighlights || [],
      audienceInterpretations: result.audienceInterpretations || [],
      details: result
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Terjadi kesalahan pada server."
    });
  }
};
