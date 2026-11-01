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
        error: "Gemini API key belum dikonfigurasi."
      });
    }

    const {
      marketingText,
      product,
      brand,
      audience,
      platform,
      goal
    } = req.body || {};

    if (!marketingText || !marketingText.trim()) {
      return res.status(400).json({
        error: "Masukkan teks pemasaran terlebih dahulu."
      });
    }

    const prompt = `
Kamu adalah CREATIQUE, AI reviewer teks pemasaran digital
yang menggunakan pendekatan ilmu pragmatik.

Analisis teks berikut berdasarkan konteks:

TEKS PEMASARAN:
${marketingText}

PRODUK/JASA:
${product || "Tidak disebutkan"}

KARAKTERISTIK MEREK:
${brand || "Tidak disebutkan"}

TARGET AUDIENS:
${audience || "Tidak disebutkan"}

PLATFORM:
${platform || "Tidak disebutkan"}

TUJUAN PEMASARAN:
${goal || "Tidak disebutkan"}

Buat analisis dalam bahasa Indonesia dengan struktur:

1. GAMBARAN UMUM
Jelaskan kesan dan fungsi komunikasi teks.

2. ANALISIS PRAGMATIK
- Tindak tutur
- Implikatur
- Praanggapan
- Kesantunan berbahasa

Untuk setiap aspek, berikan bukti berupa bagian teks
dan jelaskan alasan analisisnya. Jangan memaksakan
temuan jika aspek tertentu tidak tampak.

3. KESESUAIAN KONTEKS
Nilai kesesuaian teks dengan karakteristik merek,
target audiens, platform, dan tujuan pemasaran.

4. KEKUATAN TEKS
Jelaskan bagian yang sudah efektif beserta alasannya.

5. SARAN PERBAIKAN
Berikan saran konkret berdasarkan hasil analisis.

6. ALTERNATIF TEKS
Buat satu versi perbaikan teks pemasaran dan jelaskan
mengapa versi tersebut lebih sesuai.

Gunakan bahasa akademis yang mudah dipahami.
Jangan mengarang informasi yang tidak tersedia.
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
            maxOutputTokens: 2000
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(502).json({
        error: "Gemini gagal memproses analisis."
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
